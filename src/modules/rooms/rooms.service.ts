import { Injectable } from '@nestjs/common';
import { CreateRoomsDto } from './dto/create-rooms.dto';
import { UpdateRoomsDto } from './dto/update-rooms.dto';

@Injectable()
export class RoomsService {
  create(dto: CreateRoomsDto) {
    return 'Create rooms';
  }

  findAll() {
    return 'Find all rooms';
  }

  findOne(id: string) {
    return 'Find one rooms';
  }

  update(id: string, dto: UpdateRoomsDto) {
    return 'Update rooms';
  }

  remove(id: string) {
    return 'Remove rooms';
  }
}
