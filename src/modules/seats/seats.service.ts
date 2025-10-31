import { Injectable } from '@nestjs/common';
import { CreateSeatsDto } from './dto/create-seats.dto';
import { UpdateSeatsDto } from './dto/update-seats.dto';

@Injectable()
export class SeatsService {
  create(dto: CreateSeatsDto) {
    return 'Create seats';
  }

  findAll() {
    return 'Find all seats';
  }

  findOne(id: string) {
    return 'Find one seats';
  }

  update(id: string, dto: UpdateSeatsDto) {
    return 'Update seats';
  }

  remove(id: string) {
    return 'Remove seats';
  }
}
