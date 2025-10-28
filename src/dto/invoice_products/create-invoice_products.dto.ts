import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateInvoice_productsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  invoice_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}