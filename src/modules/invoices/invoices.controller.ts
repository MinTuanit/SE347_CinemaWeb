import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.invoicesService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.invoicesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.invoicesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.invoicesService.remove(id);
  }
}