import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductsResponseDto {
  @ApiProperty()
  product_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  created_at: Date;
}