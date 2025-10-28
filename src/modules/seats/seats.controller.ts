import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SeatsService } from './seats.service';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get()
  findAll() {
    return this.seatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.seatsService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.seatsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.seatsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.seatsService.remove(id);
  }
}