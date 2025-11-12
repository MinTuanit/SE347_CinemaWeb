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
import { Seats } from '../seats/entities/seats.entity';

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
    const capacityroom = dto.seats.length;

    const newRoom = {
      room_id: uuidv4(),
      cinema_id: dto.cinema_id,
      name: dto.name,
      capacity: capacityroom,
      created_at: new Date().toISOString(),
    };

    const newSeats = dto.seats.map((seat) => ({
      seat_id: uuidv4(),
      room_id: newRoom.room_id, // liên kết ghế với phòng này
      row: seat.row,
      col: seat.column,
      seat_label: seat.seat_label,
    }));

    // Check if the cinema exists
    const { data: cinemaData, error: cinemaError } = await this.supabase
      .from('cinemas')
      .select('cinema_id, name')
      .eq('cinema_id', dto.cinema_id)
      .single();

    if (cinemaError || !cinemaData) {
      throw new NotFoundException(`Cinema with ID ${dto.cinema_id} not found`);
    }

    try {
      // 1️⃣ Tạo room
      const { data: roomData, error: roomError } = await this.supabase
        .from('rooms')
        .insert(newRoom)
        .select('*')
        .single();

      if (roomError) {
        throw new InternalServerErrorException(
          `Lỗi khi tạo room: ${roomError.message}`,
        );
      }

      // 2️⃣ Tạo seats
      const { data: seatsData, error: seatsError } = await this.supabase
        .from('seats')
        .insert(newSeats)
        .select('*');

      if (seatsError) {
        // Nếu lỗi khi tạo seats → rollback (xóa room vừa tạo)
        await this.supabase
          .from('rooms')
          .delete()
          .eq('room_id', newRoom.room_id);
        throw new Error(`Lỗi khi tạo seats: ${seatsError.message}`);
      }

      return {
        room_id: roomData.room_id,
        cinema: {
          cinema_id: cinemaData.cinema_id,
          name: cinemaData.name,
        },
        name: roomData.name,
        capacity: newSeats.length,
        created_at: roomData.created_at,
      };
    } catch (err) {
      console.error('❌ Lỗi khi tạo room và seats:', err.message);
      throw new InternalServerErrorException(
        'Không thể tạo phòng chiếu và ghế!',
      );
    }
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
