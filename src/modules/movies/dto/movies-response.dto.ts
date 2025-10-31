import { ApiProperty } from '@nestjs/swagger';

export class MoviesResponseDto {
  @ApiProperty()
  movie_id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  duration_min: string;

  @ApiProperty()
  release_date: string;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  poster_url: string;

  @ApiProperty()
  director: string;

  @ApiProperty()
  actors: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  genre: string;
}
