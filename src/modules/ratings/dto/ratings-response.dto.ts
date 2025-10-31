import { ApiProperty } from '@nestjs/swagger';

export class RatingsResponseDto {
  @ApiProperty()
  rating_id: string;

  @ApiProperty()
  customer_id: string;

  @ApiProperty()
  movie_id: string;

  @ApiProperty()
  rating_value: string;

  @ApiProperty()
  review: string;

  @ApiProperty()
  created_at: string;
}
