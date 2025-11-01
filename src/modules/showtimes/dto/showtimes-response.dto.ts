import { ApiProperty } from '@nestjs/swagger';

export class ShowtimesResponseDto {
  @ApiProperty()
  showtime_id: string;

  @ApiProperty()
  movie_id: string;

  @ApiProperty()
  room_id: string;

  @ApiProperty()
  start_time: string;

  @ApiProperty()
  end_time: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  created_at: string;
}
