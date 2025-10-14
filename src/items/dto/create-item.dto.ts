import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    description: 'Name of the item',
    example: 'Sample Item',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the item',
    example: 'This is a sample item description',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
