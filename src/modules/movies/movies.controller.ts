import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.moviesService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.moviesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.moviesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.moviesService.remove(id);
  }
}