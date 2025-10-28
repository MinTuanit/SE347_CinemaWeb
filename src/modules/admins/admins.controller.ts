import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminsService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.adminsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.adminsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminsService.remove(id);
  }
}