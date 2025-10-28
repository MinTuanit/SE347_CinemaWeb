import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RatingsResponseDto {
  @ApiProperty()
  rating_id: number;

  @ApiProperty()
  customer_id: number;

  @ApiProperty()
  movie_id: number;

  @ApiProperty()
  rating_value: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  ratings_rating_value_check: string;
}