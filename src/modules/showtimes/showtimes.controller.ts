import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Get()
  findAll() {
    return this.showtimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.showtimesService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.showtimesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.showtimesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.showtimesService.remove(id);
  }
}