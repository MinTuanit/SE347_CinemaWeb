import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTicketsDto {
  @ApiProperty()
  @IsString()
  ticket_id: string;

  @ApiProperty()
  @IsString()
  showtime_id: string;

  @ApiProperty()
  @IsString()
  invoice_id: string;

  @ApiProperty()
  @IsString()
  seat_id: string;

  @ApiProperty()
  @IsString()
  price: string;

  @ApiProperty()
  @IsString()
  created_at: string;
}
