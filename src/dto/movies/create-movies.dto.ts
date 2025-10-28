import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateMoviesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  movie_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration_min: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rating: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  poster_url: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty()
  @IsNotEmpty()
  actors: any;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  created_at: Date;
}