import { ApiProperty } from '@nestjs/swagger';

export class InvoicesResponseDto {
  @ApiProperty()
  invoice_id: string;

  @ApiProperty()
  customer_id: string;

  @ApiProperty()
  payment_method: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  total_amount: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  invoice_code: string;
}
