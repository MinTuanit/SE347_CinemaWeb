import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCustomersDto } from './dto/create-customers.dto';
import { UpdateCustomersDto } from './dto/update-customers.dto';
import { CustomersResponseDto } from './dto/customers-response.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  /**
   * Create a new customer
   */
  async create(dto: CreateCustomersDto): Promise<CustomersResponseDto> {
    const newCustomer = {
      customer_id: uuidv4(),
      full_name: dto.full_name,
      email: dto.email,
      password_hash: dto.password_hash,
      phone_number: dto.phone_number,
      cccd: dto.cccd,
      dob: dto.dob,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabase
      .from('customers')
      .insert(newCustomer)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `Failed to create cinema: ${error.message}`,
      );
    }

    return data;
  }

  /**
   * Get all customers with room count
   */
  async findAll(): Promise<CustomersResponseDto[]> {
    const { data, error } = await this.supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(
        `Failed to fetch customers: ${error.message}`,
      );
    }

    return data;
  }

  /**
   * Get a single cinema by ID
   */
  async findOne(id: string): Promise<CustomersResponseDto> {
    const { data, error } = await this.supabase
      .from('customers')
      .select('*')
      .eq('customer_id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Cinema with ID ${id} not found`);
    }

    return data;
  }

  /**
   * Update a cinema by ID
   */
  async update(
    id: string,
    dto: UpdateCustomersDto,
  ): Promise<CustomersResponseDto> {
    // First check if cinema exists
    await this.findOne(id);

    const updateData: any = { ...dto };

    const { data, error } = await this.supabase
      .from('customers')
      .update(updateData)
      .eq('cinema_id', id)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `Failed to update cinema: ${error.message}`,
      );
    }
    return data;
  }

  /**
   * Delete a cinema by ID
   */
  async remove(id: string): Promise<{ message: string }> {
    // First check if cinema exists
    await this.findOne(id);

    const { error } = await this.supabase
      .from('customers')
      .delete()
      .eq('customer_id', id);

    if (error) {
      throw new InternalServerErrorException(
        `Failed to delete cinema: ${error.message}`,
      );
    }

    return {
      message: `Cinema with ID ${id} has been deleted successfully`,
    };
  }
}
