import { ApiProperty } from '@nestjs/swagger';

class CinemaDto {
  @ApiProperty()
  cinema_id: string;

  @ApiProperty()
  name: string;
}

class RoomDto {
  @ApiProperty()
  room_id: string;

  @ApiProperty()
  name: string;
}

class MovieDto {
  @ApiProperty()
  movie_id: string;

  @ApiProperty()
  title: string;
}

export class ShowtimesResponseDto {
  @ApiProperty()
  showtime_id: string;

  @ApiProperty({ type: () => CinemaDto })
  cinema: CinemaDto;

  @ApiProperty({ type: () => RoomDto })
  room: RoomDto;

  @ApiProperty({ type: () => MovieDto })
  movie: MovieDto;

  @ApiProperty()
  start_time: string;

  @ApiProperty()
  end_time: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ required: false })
  created_at?: string;
}
