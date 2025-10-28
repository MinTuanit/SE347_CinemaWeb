import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CinemasResponseDto {
  @ApiProperty()
  cinema_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  created_at: Date;
}