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
    const { data: showtimes, error: showtimeError } = await this.supabase
      .from('showtimes')
      .select('*, rooms(room_id, name, cinema_id), movies(movie_id, title)')
      .order('created_at', { ascending: false });

    if (showtimeError) throw showtimeError;

    const cinemaIds = [...new Set(showtimes.map(s => s.rooms?.cinema_id).filter(Boolean))];

    const { data: cinemas, error: cinemaError } = await this.supabase
      .from('cinemas')
      .select('cinema_id, name')
      .in('cinema_id', cinemaIds);

    if (cinemaError) throw cinemaError;

    const result = showtimes.map(s => ({
      ...s,
      cinema: cinemas.find(c => c.cinema_id === s.rooms?.cinema_id) || null,
    }));

    return result;
  }


  // Get a showtime by ID
  async findOne(id: string) {
    const { data: showtimeData, error: showtimeError } = await this.supabase
      .from('showtimes')
      .select('*, rooms(room_id, name, cinema_id), movies(movie_id, title)')
      .eq('showtime_id', id)
      .single();

    if (showtimeError) throw showtimeError;
    if (!showtimeData) throw new NotFoundException(`Showtime ${id} not found`);

    const cinemaId = showtimeData.rooms?.cinema_id;

    let cinema: { cinema_id: string; name: string } | null = null;
    if (cinemaId) {
      const { data: cinemaData, error: cinemaError } = await this.supabase
        .from('cinemas')
        .select('cinema_id, name')
        .eq('cinema_id', cinemaId)
        .single();

      if (cinemaError) throw cinemaError;
      cinema = cinemaData;
    }

    return {
      ...showtimeData,
      cinema,
    };
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
