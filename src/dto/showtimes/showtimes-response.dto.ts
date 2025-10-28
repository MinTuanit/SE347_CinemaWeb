import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ShowtimesResponseDto {
  @ApiProperty()
  showtime_id: number;

  @ApiProperty()
  movie_id: number;

  @ApiProperty()
  room_id: number;

  @ApiProperty()
  start_time: Date;

  @ApiProperty()
  end_time: Date;

  @ApiProperty()
  price: number;

  @ApiProperty()
  created_at: Date;
}