import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TicketsResponseDto {
  @ApiProperty()
  ticket_id: number;

  @ApiProperty()
  showtime_id: number;

  @ApiProperty()
  invoice_id: number;

  @ApiProperty()
  seat_id: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  created_at: Date;
}