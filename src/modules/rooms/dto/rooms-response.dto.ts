import { ApiProperty } from '@nestjs/swagger';

export class RoomsResponseDto {
  @ApiProperty()
  room_id: string;

  @ApiProperty()
  cinema_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  capacity: string;

  @ApiProperty()
  created_at: string;
}
