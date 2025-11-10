import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateInvoicesDto } from './dto/update-invoices.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly service: InvoicesService) { }

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.service.createBooking(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('customer/:customer_id')
  GetUserProfile(@Param('customer_id') customerId: string) {
    return this.service.getUserProfile(customerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInvoicesDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
