import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateSeatsDto } from './dto/create-seats.dto';
import { SeatsResponseDto } from './dto/seats-response.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SeatsService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  /**
   * Create a new seat
   */
  async create(dto: CreateSeatsDto): Promise<SeatsResponseDto> {
    const newSeat = {
      seat_id: uuidv4(),
      room_id: dto.room_id,
      row: dto.row,
      col: dto.col,
      seat_label: dto.seat_label,
    };

    const { data, error } = await this.supabase
      .from('seats')
      .insert(newSeat)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `Failed to create seat: ${error.message}`,
      );
    }

    const roomInfo = await this.getRoomInfo(data.room_id);
    return { ...data, room: roomInfo };
  }

  /**
   * Get all seats
   */
  async findAll(): Promise<SeatsResponseDto[]> {
    const { data, error } = await this.supabase
      .from('seats')
      .select('*')
      .order('seat_label', { ascending: true });

    if (error) {
      throw new InternalServerErrorException(
        `Failed to fetch seats: ${error.message}`,
      );
    }

    // attach room info
    const seatsWithRoom = await Promise.all(
      (data || []).map(async (seat) => ({
        ...seat,
        room: await this.getRoomInfo(seat.room_id),
      })),
    );

    return seatsWithRoom;
  }

  /**
   * Get a single seat by ID
   */
  async findOne(id: string): Promise<SeatsResponseDto> {
    const { data, error } = await this.supabase
      .from('seats')
      .select('*')
      .eq('seat_id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Seat with ID ${id} not found`);
    }

    const roomInfo = await this.getRoomInfo(data.room_id);
    return { ...data, room: roomInfo };
  }

  /**
   * Update a seat by ID
   */
  async update(
    id: string,
    dto: Partial<CreateSeatsDto>,
  ): Promise<SeatsResponseDto> {
    // Check if exists
    await this.findOne(id);

    const { data, error } = await this.supabase
      .from('seats')
      .update(dto)
      .eq('seat_id', id)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `Failed to update seat: ${error.message}`,
      );
    }

    const roomInfo = await this.getRoomInfo(data.room_id);
    return { ...data, room: roomInfo };
  }

  /**
   * Delete a seat by ID
   */
  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    const { error } = await this.supabase
      .from('seats')
      .delete()
      .eq('seat_id', id);

    if (error) {
      throw new InternalServerErrorException(
        `Failed to delete seat: ${error.message}`,
      );
    }

    return { message: `Seat with ID ${id} has been deleted successfully` };
  }

  /**
   * Helper method: Get room info (id + name)
   */
  private async getRoomInfo(
    roomId: string,
  ): Promise<{ room_id: string; name: string }> {
    const { data, error } = await this.supabase
      .from('rooms')
      .select('room_id, name')
      .eq('room_id', roomId)
      .single();

    if (error || !data) {
      return { room_id: roomId, name: 'Unknown Room' };
    }

    return data;
  }
}
