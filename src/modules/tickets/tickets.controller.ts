import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ticketsService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.ticketsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.ticketsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ticketsService.remove(id);
  }
}