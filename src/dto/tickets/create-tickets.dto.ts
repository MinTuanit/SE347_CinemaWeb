import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateTicketsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ticket_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  showtime_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  invoice_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  seat_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  created_at: Date;
}