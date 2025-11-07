import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateRoomsDto {
  @ApiProperty({
    description: 'UUID of the cinema that this room belongs to',
    example: 'c0fdbb9b-4a7b-4e6d-b2e1-f4cc1f8243aa',
  })
  @IsUUID()
  @IsNotEmpty()
  cinema_id: string;

  @ApiProperty({
    description: 'Name of the room',
    example: 'Room A',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Capacity (number of seats) in the room',
    example: 120,
  })
  @IsInt()
  @Min(1)
  capacity: number;
}
