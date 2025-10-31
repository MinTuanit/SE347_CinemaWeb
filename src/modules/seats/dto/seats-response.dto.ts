import { ApiProperty } from '@nestjs/swagger';

export class SeatsResponseDto {
  @ApiProperty()
  seat_id: string;

  @ApiProperty()
  room_id: string;

  @ApiProperty()
  row: string;

  @ApiProperty()
  col: string;

  @ApiProperty()
  seat_label: string;
}
