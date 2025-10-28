import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ratingsService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.ratingsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.ratingsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ratingsService.remove(id);
  }
}