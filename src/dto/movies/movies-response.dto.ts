import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MoviesResponseDto {
  @ApiProperty()
  movie_id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  duration_min: number;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  poster_url: string;

  @ApiProperty()
  director: string;

  @ApiProperty()
  actors: any;

  @ApiProperty()
  created_at: Date;
}