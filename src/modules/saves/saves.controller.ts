import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SavesService } from './saves.service';

@Controller('saves')
export class SavesController {
  constructor(private readonly savesService: SavesService) {}

  @Get()
  findAll() {
    return this.savesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.savesService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.savesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.savesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.savesService.remove(id);
  }
}