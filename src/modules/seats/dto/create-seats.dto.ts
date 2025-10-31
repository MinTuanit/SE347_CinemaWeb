import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSeatsDto {
  @ApiProperty()
  @IsString()
  seat_id: string;

  @ApiProperty()
  @IsString()
  room_id: string;

  @ApiProperty()
  @IsString()
  row: string;

  @ApiProperty()
  @IsString()
  col: string;

  @ApiProperty()
  @IsString()
  seat_label: string;
}
