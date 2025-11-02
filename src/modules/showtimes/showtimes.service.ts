import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateShowtimesDto } from './dto/create-showtimes.dto';
import { UpdateShowtimesDto } from './dto/update-showtimes.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ShowtimesService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) { }

  async create(dto: CreateShowtimesDto) {
    const newShowtime = {
      showtime_id: uuidv4(), // generate UUID
      ...dto,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabase
      .from('showtimes')
      .insert(newShowtime)
      .select();

    if (error) throw error;
    return data;
  }

  // Get all showtimes
  // async findAll() {
  //   const { data, error } = await this.supabase
  //     .from('showtimes')
  //     .select('*')
  //     .order('created_at', { ascending: false });

  //   if (error) throw error;
  //   return data;
  // }

  async findAll() {
    const { data, error } = await this.supabase
      .from('showtimes')
      .select('*, cinemas(cinema_id, name), rooms(room_id, name), movies(movie_id, title)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get a showtime by ID
  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('showtimes')
      .select('*, cinemas(cinema_id, name), rooms(room_id, name), movies(movie_id, title)')
      .eq('showtime_id', id);

    if (error) throw error;
    if (!data || data.length === 0) throw new NotFoundException(`Showtime ${id} not found`);
    return data;
  }

  // Update showtime
  async update(id: string, dto: UpdateShowtimesDto) {
    const { data, error } = await this.supabase
      .from('showtimes')
      .update(dto)
      .eq('showtime_id', id)
      .select();

    if (error) throw error;
    return data;
  }

  // Delete showtime
  async remove(id: string) {
    const { error } = await this.supabase
      .from('showtimes')
      .delete()
      .eq('showtime_id', id);

    if (error) throw error;
    return { message: `Showtime with id ${id} deleted successfully` };
  }
}
