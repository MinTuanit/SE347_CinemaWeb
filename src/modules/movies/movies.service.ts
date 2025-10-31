import { Injectable } from '@nestjs/common';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';

@Injectable()
export class MoviesService {
  create(dto: CreateMoviesDto) {
    return 'Create movies';
  }

  findAll() {
    return 'Find all movies';
  }

  findOne(id: string) {
    return 'Find one movies';
  }

  update(id: string, dto: UpdateMoviesDto) {
    return 'Update movies';
  }

  remove(id: string) {
    return 'Remove movies';
  }
}
