import { Injectable } from '@nestjs/common';
import { CreateAdminsDto } from './dto/create-admins.dto';
import { UpdateAdminsDto } from './dto/update-admins.dto';

@Injectable()
export class AdminsService {
  create(dto: CreateAdminsDto) {
    return 'Create admins';
  }

  findAll() {
    return 'Find all admins';
  }

  findOne(id: string) {
    return 'Find one admins';
  }

  update(id: string, dto: UpdateAdminsDto) {
    return 'Update admins';
  }

  remove(id: string) {
    return 'Remove admins';
  }
}
