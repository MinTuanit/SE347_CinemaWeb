import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MoviesService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async findAll() {
    const { data, error } = await this.supabase.from('movies').select('*');

    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('movies')
      .select('*')
      .eq('movie_id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(dto: CreateMoviesDto) {
    const newMovie = {
      movie_id: uuidv4(),
      title: dto.title,
      genre: dto.genre,
      duration_min: dto.duration_min,
      release_date: dto.release_date,
      description: dto.description,
      poster_url: dto.poster_url,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabase
      .from('movies')
      .insert(newMovie)
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: string, dto: UpdateMoviesDto) {
    const updateData: any = { ...dto };

    const { data, error } = await this.supabase
      .from('movies')
      .update(updateData)
      .eq('movie_id', id)
      .select();

    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase
      .from('movies')
      .delete()
      .eq('movie_id', id);

    if (error) throw error;
    return { message: 'Movie deleted successfully' };
  }
}
