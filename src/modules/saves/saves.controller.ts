import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SavesService } from './saves.service';
import { CreateSavesDto } from './dto/create-saves.dto';
import { UpdateSavesDto } from './dto/update-saves.dto';

@Controller('saves')
export class SavesController {
  constructor(private readonly service: SavesService) {}

  @Post()
  create(@Body() dto: CreateSavesDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSavesDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
