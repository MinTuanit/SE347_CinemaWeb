import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateInvoicesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  invoice_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  total_amount: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  payment_method_enum: string?;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  created_at: Date;
}