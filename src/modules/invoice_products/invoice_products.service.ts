import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateInvoice_productsDto } from './dto/create-invoice_products.dto';
import { UpdateInvoice_productsDto } from './dto/update-invoice_products.dto';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class Invoice_productsService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) { }

  async create(dto: CreateInvoice_productsDto) {

    const { data, error } = await this.supabase
      .from('invoice_products')
      .insert(dto)
      .select();

    if (error) throw error;
    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('invoice_products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('invoice_products')
      .select('*')
      .eq('invoice_product_id', id);

    if (error) throw error;
    if (!data || data.length === 0) throw new NotFoundException(`Invoice product ${id} not found`);
    return data[0];
  }

  async update(id: string, dto: UpdateInvoice_productsDto) {
    const { data, error } = await this.supabase
      .from('invoice_products')
      .update(dto)
      .eq('invoice_product_id', id)
      .select();

    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase
      .from('invoice_products')
      .delete()
      .eq('invoice_product_id', id);

    if (error) throw error;
    return { message: `Invoice product with id ${id} deleted successfully` };
  }
}
