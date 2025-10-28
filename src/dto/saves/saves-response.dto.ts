import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SavesResponseDto {
  @ApiProperty()
  customer_id: number;

  @ApiProperty()
  movie_id: number;

  @ApiProperty()
  created_at: Date;
}