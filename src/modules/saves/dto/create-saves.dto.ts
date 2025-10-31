import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSavesDto {
  @ApiProperty()
  @IsString()
  customer_id: string;

  @ApiProperty()
  @IsString()
  movie_id: string;

  @ApiProperty()
  @IsString()
  created_at: string;
}
