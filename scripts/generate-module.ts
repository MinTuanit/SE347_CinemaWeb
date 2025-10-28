import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const tables = [
  'admins',
  'cinemas',
  'customers',
  'movies',
  'products',
  'invoices',
  'invoice_products',
  'tickets',
  'showtimes',
  'rooms',
  'seats',
  'saves',
  'ratings',
];

tables.forEach((table) => {
  const name = table.toLowerCase();
  const className = name.charAt(0).toUpperCase() + name.slice(1);

  console.log(`🚀 Generating module for ${name}...`);
  execSync(`npx nest g module ${name} --no-spec`, { stdio: 'inherit' });
  execSync(`npx nest g service ${name} --no-spec`, { stdio: 'inherit' });
  execSync(`npx nest g controller ${name} --no-spec`, { stdio: 'inherit' });

  const serviceFile = path.join('src', name, `${name}.service.ts`);
  const controllerFile = path.join('src', name, `${name}.controller.ts`);

  // Ghi code vào service
  fs.writeFileSync(
    serviceFile,
    `
import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class ${className}Service {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async findAll() {
    const { data, error } = await this.supabase.from('${name}').select('*');
    if (error) throw error;
    return data;
  }

  async findOne(id: number) {
    const { data, error } = await this.supabase.from('${name}').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(payload: any) {
    const { data, error } = await this.supabase.from('${name}').insert(payload).select();
    if (error) throw error;
    return data;
  }

  async update(id: number, payload: any) {
    const { data, error } = await this.supabase.from('${name}').update(payload).eq('id', id).select();
    if (error) throw error;
    return data;
  }

  async remove(id: number) {
    const { error } = await this.supabase.from('${name}').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Deleted successfully' };
  }
}
  `.trim(),
  );

  // Ghi code controller
  fs.writeFileSync(
    controllerFile,
    `
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ${className}Service } from './${name}.service';

@Controller('${name}')
export class ${className}Controller {
  constructor(private readonly ${name}Service: ${className}Service) {}

  @Get()
  findAll() {
    return this.${name}Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.${name}Service.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.${name}Service.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.${name}Service.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.${name}Service.remove(id);
  }
}
  `.trim(),
  );
});
