import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseClient } from '../config/supabase.config';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemResponseDto } from './dto/item-response.dto';

@Injectable()
export class ItemsService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    // Initialize Supabase client with service role key for full access
    this.supabase = createSupabaseClient(this.configService, true);
  }

  /**
   * Create a new item
   */
  async create(createItemDto: CreateItemDto): Promise<ItemResponseDto> {
    const { data, error } = await this.supabase
      .from('items')
      .insert([createItemDto])
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `Failed to create item: ${error.message}`,
      );
    }

    return data;
  }

  /**
   * Get all items
   */
  async findAll(): Promise<ItemResponseDto[]> {
    const { data, error } = await this.supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(
        `Failed to fetch items: ${error.message}`,
      );
    }

    return data || [];
  }

  /**
   * Get a single item by ID
   */
  async findOne(id: string): Promise<ItemResponseDto> {
    const { data, error } = await this.supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return data;
  }

  /**
   * Update an item by ID
   */
  async update(
    id: string,
    updateItemDto: UpdateItemDto,
  ): Promise<ItemResponseDto> {
    // First check if item exists
    await this.findOne(id);

    const { data, error } = await this.supabase
      .from('items')
      .update({
        ...updateItemDto,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `Failed to update item: ${error.message}`,
      );
    }

    return data;
  }

  /**
   * Delete an item by ID
   */
  async remove(id: string): Promise<{ message: string }> {
    // First check if item exists
    await this.findOne(id);

    const { error } = await this.supabase.from('items').delete().eq('id', id);

    if (error) {
      throw new InternalServerErrorException(
        `Failed to delete item: ${error.message}`,
      );
    }

    return { message: `Item with ID ${id} has been deleted successfully` };
  }
}
