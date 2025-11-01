import { Injectable, Inject } from '@nestjs/common';
import { CreateRatingsDto } from './dto/create-ratings.dto';
import { UpdateRatingsDto } from './dto/update-ratings.dto';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class RatingsService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) { }

  // CREATE
  async create(dto: CreateRatingsDto) {
    const rating = {
      rating_id: uuidv4(), // generate UUID
      ...dto,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabase
      .from('ratings')
      .insert(rating)
      .select();

    if (error) throw error;
    return data;
  }

  // READ ALL
  async findAll() {
    const { data, error } = await this.supabase
      .from('ratings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // READ ONE
  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('ratings')
      .select('*')
      .eq('rating_id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // UPDATE
  async update(id: string, dto: UpdateRatingsDto) {
    const { data, error } = await this.supabase
      .from('ratings')
      .update(dto)
      .eq('rating_id', id)
      .select();

    if (error) throw error;
    return data;
  }

  // DELETE
  async remove(id: string) {
    const { error } = await this.supabase
      .from('ratings')
      .delete()
      .eq('rating_id', id);

    if (error) throw error;
    return { message: `Rating ${id} deleted successfully` };
  }
}
