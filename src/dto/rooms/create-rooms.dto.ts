import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateRoomsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cinema_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  created_at: Date;
}