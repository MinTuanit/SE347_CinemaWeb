import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SeatsResponseDto {
  @ApiProperty()
  seat_id: number;

  @ApiProperty()
  room_id: number;

  @ApiProperty()
  row: number;

  @ApiProperty()
  col: number;

  @ApiProperty()
  seat_label: string;
}