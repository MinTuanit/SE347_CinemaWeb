import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateInvoicesDto } from './dto/create-invoices.dto';
import { UpdateInvoicesDto } from './dto/update-invoices.dto';
import { InvoicesResponseDto } from './dto/invoices-response.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InvoicesService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
  ) { }

  async create(dto: CreateInvoicesDto) {
    const newInvoice = {
      invoice_id: dto.invoice_id || uuidv4(),
      invoice_code: dto.invoice_code,
      customer_id: dto.customer_id,
      payment_method: dto.payment_method,
      status: dto.status,
      total_amount: dto.total_amount,
      created_at: dto.created_at || new Date().toISOString(),
    };

    const { data, error } = await this.supabase
      .from('invoices')
      .insert(newInvoice)
      .select();

    if (error) throw error;
    return data;
  }

  async findAll(): Promise<InvoicesResponseDto[]> {
    const { data, error } = await this.supabase
      .from('invoices')
      .select(`
        *,
        customers(customer_id, full_name, email),
        tickets(showtime_id, price, seats(seat_number)),
        invoice_products(quantity, price, products(product_id, name))
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform data to match InvoicesResponseDto
    return data.map(invoice => ({
      invoice_id: invoice.invoice_id,
      invoice_code: invoice.invoice_code,
      customer: invoice.customers,
      ticket_count: invoice.tickets?.length || 0,
      product_count: invoice.invoice_products?.length || 0,
      tickets: {
        title: 'Movie Title', // Placeholder, need to join with movies via showtimes
        showtime: '2023-10-01T12:00:00Z', // Placeholder
        price: invoice.tickets?.[0]?.price || 0,
        seats: invoice.tickets?.flatMap(t => t.seats?.map(s => s.seat_number) || []) || [],
      },
      products: invoice.invoice_products?.map(ip => ({
        product_id: ip.products.product_id,
        name: ip.products.name,
        quantity: ip.quantity,
        price: ip.price,
        total: ip.quantity * ip.price,
      })) || [],
      payment_method: invoice.payment_method,
      total_amount: parseFloat(invoice.total_amount),
      status: invoice.status,
      created_at: invoice.created_at,
    }));
  }

  async findOne(id: string): Promise<InvoicesResponseDto> {
    const { data, error } = await this.supabase
      .from('invoices')
      .select(`
        *,
        customers(customer_id, full_name, email),
        tickets(showtime_id, price, seats(seat_number)),
        invoice_products(quantity, price, products(product_id, name))
      `)
      .eq('invoice_id', id)
      .single();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Invoice ${id} not found`);

    // Transform data to match InvoicesResponseDto
    return {
      invoice_id: data.invoice_id,
      invoice_code: data.invoice_code,
      customer: data.customers,
      ticket_count: data.tickets?.length || 0,
      product_count: data.invoice_products?.length || 0,
      tickets: {
        title: 'Movie Title', // Placeholder
        showtime: '2023-10-01T12:00:00Z', // Placeholder
        price: data.tickets?.[0]?.price || 0,
        seats: data.tickets?.flatMap(t => t.seats?.map(s => s.seat_number) || []) || [],
      },
      products: data.invoice_products?.map(ip => ({
        product_id: ip.products.product_id,
        name: ip.products.name,
        quantity: ip.quantity,
        price: ip.price,
        total: ip.quantity * ip.price,
      })) || [],
      payment_method: data.payment_method,
      total_amount: parseFloat(data.total_amount),
      status: data.status,
      created_at: data.created_at,
    };
  }

  async update(id: string, dto: UpdateInvoicesDto) {
    const { data, error } = await this.supabase
      .from('invoices')
      .update(dto)
      .eq('invoice_id', id)
      .select();

    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase
      .from('invoices')
      .delete()
      .eq('invoice_id', id);

    if (error) throw error;
    return { message: `Invoice with id ${id} deleted successfully` };
  }
}
