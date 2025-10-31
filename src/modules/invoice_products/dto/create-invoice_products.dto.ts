import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInvoice_productsDto {
  @ApiProperty()
  @IsString()
  invoice_id: string;

  @ApiProperty()
  @IsString()
  product_id: string;

  @ApiProperty()
  @IsString()
  quantity: string;
}
