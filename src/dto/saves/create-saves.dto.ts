import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateSavesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  movie_id: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  created_at: Date;
}