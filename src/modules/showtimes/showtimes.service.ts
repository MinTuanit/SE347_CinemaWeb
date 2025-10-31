import { Injectable } from '@nestjs/common';
import { CreateShowtimesDto } from './dto/create-showtimes.dto';
import { UpdateShowtimesDto } from './dto/update-showtimes.dto';

@Injectable()
export class ShowtimesService {
  create(dto: CreateShowtimesDto) {
    return 'Create showtimes';
  }

  findAll() {
    return 'Find all showtimes';
  }

  findOne(id: string) {
    return 'Find one showtimes';
  }

  update(id: string, dto: UpdateShowtimesDto) {
    return 'Update showtimes';
  }

  remove(id: string) {
    return 'Remove showtimes';
  }
}
