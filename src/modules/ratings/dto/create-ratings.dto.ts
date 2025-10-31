import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRatingsDto {
  @ApiProperty()
  @IsString()
  rating_id: string;

  @ApiProperty()
  @IsString()
  customer_id: string;

  @ApiProperty()
  @IsString()
  movie_id: string;

  @ApiProperty()
  @IsString()
  rating_value: string;

  @ApiProperty()
  @IsString()
  review: string;

  @ApiProperty()
  @IsString()
  created_at: string;
}
