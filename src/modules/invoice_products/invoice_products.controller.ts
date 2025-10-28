import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Invoice_productsService } from './invoice_products.service';

@Controller('invoice_products')
export class Invoice_productsController {
  constructor(private readonly invoice_productsService: Invoice_productsService) {}

  @Get()
  findAll() {
    return this.invoice_productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.invoice_productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.invoice_productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.invoice_productsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.invoice_productsService.remove(id);
  }
}