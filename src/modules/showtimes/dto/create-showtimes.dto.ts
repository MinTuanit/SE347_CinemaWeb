import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShowtimesDto {
  @ApiProperty()
  @IsString()
  showtime_id: string;

  @ApiProperty()
  @IsString()
  movie_id: string;

  @ApiProperty()
  @IsString()
  room_id: string;

  @ApiProperty()
  @IsString()
  start_time: string;

  @ApiProperty()
  @IsString()
  end_time: string;

  @ApiProperty()
  @IsString()
  price: string;

  @ApiProperty()
  @IsString()
  created_at: string;
}
