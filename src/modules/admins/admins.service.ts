import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateAdminsDto } from './dto/create-admins.dto';
import { UpdateAdminsDto } from './dto/update-admins.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdminsService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) { }

  async findAll() {
    const { data, error } = await this.supabase
      .from('admins')
      .select('*');

    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('admins')
      .select('*')
      .eq('user_id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(dto: CreateAdminsDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newAdmin = {
      user_id: uuidv4(),
      full_name: dto.full_name,
      email: dto.email,
      password_hash: hashedPassword,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabase
      .from('admins')
      .insert(newAdmin)
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: string, dto: UpdateAdminsDto) {
    const updateData: any = { ...dto };

    // If password exists, hash it before updating
    if (dto.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(dto.password, salt);
      updateData.password_hash = hashedPassword;
      delete updateData.password; // xóa field plaintext password
    }

    const { data, error } = await this.supabase
      .from('admins')
      .update(updateData)
      .eq('user_id', id)
      .select();

    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase.
      from('admins')
      .delete()
      .eq('user_id', id);

    if (error) throw error;
    return { message: 'Deleted successfully' };
  }
}
