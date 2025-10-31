import { Injectable } from '@nestjs/common';
import { CreateCustomersDto } from './dto/create-customers.dto';
import { UpdateCustomersDto } from './dto/update-customers.dto';

@Injectable()
export class CustomersService {
  create(dto: CreateCustomersDto) {
    return 'Create customers';
  }

  findAll() {
    return 'Find all customers';
  }

  findOne(id: string) {
    return 'Find one customers';
  }

  update(id: string, dto: UpdateCustomersDto) {
    return 'Update customers';
  }

  remove(id: string) {
    return 'Remove customers';
  }
}
