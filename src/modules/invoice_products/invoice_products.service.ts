import { Injectable } from '@nestjs/common';
import { CreateInvoice_productsDto } from './dto/create-invoice_products.dto';
import { UpdateInvoice_productsDto } from './dto/update-invoice_products.dto';

@Injectable()
export class Invoice_productsService {
  create(dto: CreateInvoice_productsDto) {
    return 'Create invoice_products';
  }

  findAll() {
    return 'Find all invoice_products';
  }

  findOne(id: string) {
    return 'Find one invoice_products';
  }

  update(id: string, dto: UpdateInvoice_productsDto) {
    return 'Update invoice_products';
  }

  remove(id: string) {
    return 'Remove invoice_products';
  }
}
