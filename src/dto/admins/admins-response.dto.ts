import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AdminsResponseDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password_hash: string;

  @ApiProperty()
  created_at: Date;
}