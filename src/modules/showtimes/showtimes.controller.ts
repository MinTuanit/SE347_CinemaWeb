import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimesDto } from './dto/create-showtimes.dto';
import { UpdateShowtimesDto } from './dto/update-showtimes.dto';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly service: ShowtimesService) {}

  @Post()
  create(@Body() dto: CreateShowtimesDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateShowtimesDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
