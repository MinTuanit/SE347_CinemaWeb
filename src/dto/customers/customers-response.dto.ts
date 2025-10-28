import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomersResponseDto {
  @ApiProperty()
  customer_id: number;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password_hash: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  created_at: Date;
}