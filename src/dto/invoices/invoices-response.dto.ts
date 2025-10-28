import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InvoicesResponseDto {
  @ApiProperty()
  invoice_id: number;

  @ApiProperty()
  customer_id: number;

  @ApiProperty()
  total_amount: number;

  @ApiPropertyOptional()
  payment_method_enum: string?;

  @ApiProperty()
  status: string;

  @ApiProperty()
  created_at: Date;
}