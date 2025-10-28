import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateRatingsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rating_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  movie_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rating_value: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ratings_rating_value_check: string;
}