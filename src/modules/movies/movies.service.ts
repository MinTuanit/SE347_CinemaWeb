import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateMoviesDto } from './dto/create-movies.dto';
import slugify from 'slugify';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MoviesService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) { }

  private async getMovieStatus(movie_id: string, release_date: string): Promise<string> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const releaseDate = new Date(release_date);

    let status = 'unknown';

    if (releaseDate > today) {
      // Coming soon: release date is in the future
      status = 'coming soon';
    } else {
      // Check if there are any showtimes for this movie in the next 30 days
      const { data: showtimes, error: showtimesError } = await this.supabase
        .from('showtimes')
        .select('showtime_id, start_time')
        .eq('movie_id', movie_id)
        .gte('start_time', today.toISOString())
        .lte('start_time', thirtyDaysFromNow.toISOString());

      if (showtimesError) {
        status = 'unknown';
      } else if (showtimes && showtimes.length > 0) {
        // Has showtimes in next 30 days
        status = 'now showing';
      } else {
        // No showtimes in next 30 days
        status = 'stopped';
      }
    }

    return status;
  }

  async findAll() {
    const { data, error } = await this.supabase.from('movies').select('*');

    if (error) throw error;
    return data;
  }

  async findAllByCustomerId(user_id: string) {
    const { data, error } = await this.supabase
      .from('saves')
      .select(`
        movies(
          movie_id,
          title,
          description,
          duration_min,
          release_date,
          rating,
          poster_url,
          director,
          actors,
          genre,
          created_at
        )
      `)
      .eq('customer_id', user_id);

    if (error) throw error;

    // Transform data to include isSaved flag and calculate status
    const results = await Promise.all(data.map(async (save) => {
      const movie = save.movies;

      // Handle case where movies might be an array or single object
      const movieData = Array.isArray(movie) ? movie[0] : movie;

      if (!movieData || !movieData.movie_id) {
        return null;
      }

      const status = await this.getMovieStatus(movieData.movie_id, movieData.release_date);

      return {
        ...movieData,
        status,
        isSaved: true,
      };
    }));

    return results.filter(movie => movie !== null);
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

  async findBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('movies')
      .select('*')
      .eq('slug', slug)
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
      slug: slugify(dto.title, { lower: true, strict: true }),
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
