import { Injectable } from '@nestjs/common';
import { CreateTicketsDto } from './dto/create-tickets.dto';
import { UpdateTicketsDto } from './dto/update-tickets.dto';

@Injectable()
export class TicketsService {
  create(dto: CreateTicketsDto) {
    return 'Create tickets';
  }

  findAll() {
    return 'Find all tickets';
  }

  findOne(id: string) {
    return 'Find one tickets';
  }

  update(id: string, dto: UpdateTicketsDto) {
    return 'Update tickets';
  }

  remove(id: string) {
    return 'Remove tickets';
  }
}
