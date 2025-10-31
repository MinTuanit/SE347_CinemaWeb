import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMoviesDto {
  @ApiProperty()
  @IsString()
  movie_id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  duration_min: string;

  @ApiProperty()
  @IsString()
  release_date: string;

  @ApiProperty()
  @IsString()
  rating: string;

  @ApiProperty()
  @IsString()
  poster_url: string;

  @ApiProperty()
  @IsString()
  director: string;

  @ApiProperty()
  @IsString()
  actors: string;

  @ApiProperty()
  @IsString()
  created_at: string;

  @ApiProperty()
  @IsString()
  genre: string;
}
