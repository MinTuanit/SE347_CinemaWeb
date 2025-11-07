import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { CreateRoomsDto } from './dto/create-rooms.dto';
import { UpdateRoomsDto } from './dto/update-rooms.dto';
import { RoomsResponseDto } from './dto/rooms-response.dto';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  /**
   * Create a new room
   */
  async create(dto: CreateRoomsDto): Promise<RoomsResponseDto> {
    // Check if the cinema exists
    const { data: cinemaData, error: cinemaError } = await this.supabase
      .from('cinemas')
      .select('cinema_id, name')
      .eq('cinema_id', dto.cinema_id)
      .single();

    if (cinemaError || !cinemaData) {
      throw new NotFoundException(`Cinema with ID ${dto.cinema_id} not found`);
    }

    const newRoom = {
      room_id: uuidv4(),
      cinema_id: dto.cinema_id,
      name: dto.name,
      capacity: dto.capacity,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await this.supabase
      .from('rooms')
      .insert(newRoom)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `Failed to create room: ${error.message}`,
      );
    }

    return {
      ...data,
      cinema: cinemaData,
    };
  }

  /**
   * Get all rooms with their cinema info
   */
  async findAll(): Promise<RoomsResponseDto[]> {
    const { data: rooms, error } = await this.supabase
      .from('rooms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(
        `Failed to fetch rooms: ${error.message}`,
      );
    }

    const results: RoomsResponseDto[] = [];

    for (const room of rooms || []) {
      const cinema = await this.getCinemaInfo(room.cinema_id);
      results.push({
        ...room,
        cinema,
      });
    }

    return results;
  }

  /**
   * Get a single room by ID
   */
  async findOne(id: string): Promise<RoomsResponseDto> {
    const { data, error } = await this.supabase
      .from('rooms')
      .select('*')
      .eq('room_id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    const cinema = await this.getCinemaInfo(data.cinema_id);
    return { ...data, cinema };
  }

  /**
   * Update a room by ID
   */
  async update(id: string, dto: UpdateRoomsDto): Promise<RoomsResponseDto> {
    // Check if room exists
    await this.findOne(id);

    const updateData: any = { ...dto };

    const { data, error } = await this.supabase
      .from('rooms')
      .update(updateData)
      .eq('room_id', id)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `Failed to update room: ${error.message}`,
      );
    }

    const cinema = await this.getCinemaInfo(data.cinema_id);
    return { ...data, cinema };
  }

  /**
   * Delete a room by ID
   */
  async remove(id: string): Promise<{ message: string }> {
    // Check if room exists
    await this.findOne(id);

    const { error } = await this.supabase
      .from('rooms')
      .delete()
      .eq('room_id', id);

    if (error) {
      throw new InternalServerErrorException(
        `Failed to delete room: ${error.message}`,
      );
    }

    return { message: `Room with ID ${id} has been deleted successfully` };
  }

  /**
   * Helper method: Get cinema info for a room
   */
  private async getCinemaInfo(cinemaId: string): Promise<{
    cinema_id: string;
    name: string;
  }> {
    const { data, error } = await this.supabase
      .from('cinemas')
      .select('cinema_id, name')
      .eq('cinema_id', cinemaId)
      .single();

    if (error || !data) {
      return { cinema_id: cinemaId, name: 'Unknown Cinema' };
    }

    return data;
  }
}
