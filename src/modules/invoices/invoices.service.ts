import { Injectable } from '@nestjs/common';
import { CreateInvoicesDto } from './dto/create-invoices.dto';
import { UpdateInvoicesDto } from './dto/update-invoices.dto';

@Injectable()
export class InvoicesService {
  create(dto: CreateInvoicesDto) {
    return 'Create invoices';
  }

  findAll() {
    return 'Find all invoices';
  }

  findOne(id: string) {
    return 'Find one invoices';
  }

  update(id: string, dto: UpdateInvoicesDto) {
    return 'Update invoices';
  }

  remove(id: string) {
    return 'Remove invoices';
  }
}
