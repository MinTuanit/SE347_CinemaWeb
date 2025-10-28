import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoomsResponseDto {
  @ApiProperty()
  room_id: number;

  @ApiProperty()
  cinema_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  created_at: Date;
}