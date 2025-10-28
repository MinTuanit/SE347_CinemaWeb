import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateSeatsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  seat_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  row: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  col: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  seat_label: string;
}