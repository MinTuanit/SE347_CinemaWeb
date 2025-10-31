import { Injectable } from '@nestjs/common';
import { CreateSavesDto } from './dto/create-saves.dto';
import { UpdateSavesDto } from './dto/update-saves.dto';

@Injectable()
export class SavesService {
  create(dto: CreateSavesDto) {
    return 'Create saves';
  }

  findAll() {
    return 'Find all saves';
  }

  findOne(id: string) {
    return 'Find one saves';
  }

  update(id: string, dto: UpdateSavesDto) {
    return 'Update saves';
  }

  remove(id: string) {
    return 'Remove saves';
  }
}
