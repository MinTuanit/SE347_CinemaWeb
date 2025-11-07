import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInvoicesDto {
  @ApiPropertyOptional({
    description: 'The unique identifier for the invoice (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsOptional()
  invoice_id?: string;

  @ApiProperty({
    description: 'The ID of the customer (UUID)',
    example: '456e7890-e89b-12d3-a456-426614174001',
  })
  @IsString()
  customer_id: string;

  @ApiProperty({
    description: 'The payment method used for the invoice',
    example: 'card',
  })
  @IsString()
  payment_method: string;

  @ApiProperty({
    description: 'The status of the invoice',
    example: 'pending',
  })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'The total amount of the invoice',
    example: '150.00',
  })
  @IsString()
  total_amount: string;

  @ApiPropertyOptional({
    description: 'The creation timestamp of the invoice',
    example: '2023-10-01T12:00:00Z',
  })
  @IsString()
  @IsOptional()
  created_at?: string;

  @ApiProperty({
    description: 'The unique code for the invoice',
    example: 'INV-2023-001',
  })
  @IsString()
  invoice_code: string;
}
