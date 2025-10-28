import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Invoice_productsResponseDto {
  @ApiProperty()
  invoice_id: number;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  quantity: number;
}