import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateShowtimesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  showtime_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  movie_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  start_time: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  end_time: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  created_at: Date;
}