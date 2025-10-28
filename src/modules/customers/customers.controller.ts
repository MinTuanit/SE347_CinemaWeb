import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersService.remove(id);
  }
}