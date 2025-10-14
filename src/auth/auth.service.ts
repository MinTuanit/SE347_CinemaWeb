import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseClient } from '../config/supabase.config';
import { SignUpDto, SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    // Use anon key for auth operations (more secure than service role)
    this.supabase = createSupabaseClient(this.configService, false);
  }

  /**
   * Sign up a new user with email and password
   */
  async signUp(signUpDto: SignUpDto) {
    const { email, password, fullName } = signUpDto;

    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data.user) {
      throw new InternalServerErrorException('Failed to create user');
    }

    return {
      message:
        'Sign up successful. Please check your email to verify your account.',
      user: {
        id: data.user.id,
        email: data.user.email,
        email_confirmed_at: data.user.email_confirmed_at,
        created_at: data.user.created_at,
      },
      session: data.session
        ? {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          }
        : null,
    };
  }

  /**
   * Sign in user with email and password
   */
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!data.session) {
      throw new UnauthorizedException('Failed to create session');
    }

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        email_confirmed_at: data.user.email_confirmed_at,
        created_at: data.user.created_at,
      },
    };
  }

  /**
   * Sign out current user
   */
  async signOut(accessToken: string) {
    // Set the session for the current user
    const { error } = await this.supabase.auth.admin.signOut(accessToken);

    if (error) {
      throw new UnauthorizedException('Failed to sign out');
    }

    return { message: 'Sign out successful' };
  }

  /**
   * Get current user from access token
   */
  async getUser(accessToken: string) {
    const { data, error } = await this.supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return {
      id: data.user.id,
      email: data.user.email,
      email_confirmed_at: data.user.email_confirmed_at,
      created_at: data.user.created_at,
      user_metadata: data.user.user_metadata,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string) {
    const { data, error } = await this.supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || !data.session || !data.user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        email_confirmed_at: data.user.email_confirmed_at,
        created_at: data.user.created_at,
      },
    };
  }

  /**
   * Send password reset email
   */
  async forgotPassword(email: string) {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${this.configService.get('FRONTEND_URL')}/reset-password`,
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return {
      message: 'Password reset email sent. Please check your inbox.',
    };
  }

  /**
   * Update password (requires valid access token)
   */
  async resetPassword(accessToken: string, newPassword: string) {
    // Set session with access token
    const { error: sessionError } = await this.supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: '', // Not needed for password update
    });

    if (sessionError) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const { error } = await this.supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return {
      message: 'Password updated successfully',
    };
  }

  /**
   * Verify if access token is valid
   */
  async verifyToken(accessToken: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.auth.getUser(accessToken);
      return !error && !!data.user;
    } catch {
      return false;
    }
  }
}
