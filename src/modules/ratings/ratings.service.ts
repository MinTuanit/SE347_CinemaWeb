import { Injectable } from '@nestjs/common';
import { CreateRatingsDto } from './dto/create-ratings.dto';
import { UpdateRatingsDto } from './dto/update-ratings.dto';

@Injectable()
export class RatingsService {
  create(dto: CreateRatingsDto) {
    return 'Create ratings';
  }

  findAll() {
    return 'Find all ratings';
  }

  findOne(id: string) {
    return 'Find one ratings';
  }

  update(id: string, dto: UpdateRatingsDto) {
    return 'Update ratings';
  }

  remove(id: string) {
    return 'Remove ratings';
  }
}
