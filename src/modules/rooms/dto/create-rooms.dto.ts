import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoomsDto {
  @ApiProperty()
  @IsString()
  room_id: string;

  @ApiProperty()
  @IsString()
  cinema_id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  capacity: string;

  @ApiProperty()
  @IsString()
  created_at: string;
}
