import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CinemasService } from './cinemas.service';

@Controller('cinemas')
export class CinemasController {
  constructor(private readonly cinemasService: CinemasService) {}

  @Get()
  findAll() {
    return this.cinemasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cinemasService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.cinemasService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.cinemasService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cinemasService.remove(id);
  }
}