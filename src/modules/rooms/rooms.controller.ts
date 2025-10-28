import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roomsService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.roomsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.roomsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roomsService.remove(id);
  }
}