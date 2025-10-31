import { Injectable } from '@nestjs/common';
import { CreateCinemasDto } from './dto/create-cinemas.dto';
import { UpdateCinemasDto } from './dto/update-cinemas.dto';

@Injectable()
export class CinemasService {
  create(dto: CreateCinemasDto) {
    return 'Create cinemas';
  }

  findAll() {
    return 'Find all cinemas';
  }

  findOne(id: string) {
    return 'Find one cinemas';
  }

  update(id: string, dto: UpdateCinemasDto) {
    return 'Update cinemas';
  }

  remove(id: string) {
    return 'Remove cinemas';
  }
}
