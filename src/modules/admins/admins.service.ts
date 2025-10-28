import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AdminsService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async findAll() {
    const { data, error } = await this.supabase.from('admins').select('*');
    if (error) throw error;
    return data;
  }

  async findOne(id: number) {
    const { data, error } = await this.supabase.from('admins').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(payload: any) {
    const { data, error } = await this.supabase.from('admins').insert(payload).select();
    if (error) throw error;
    return data;
  }

  async update(id: number, payload: any) {
    const { data, error } = await this.supabase.from('admins').update(payload).eq('id', id).select();
    if (error) throw error;
    return data;
  }

  async remove(id: number) {
    const { error } = await this.supabase.from('admins').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Deleted successfully' };
  }
}