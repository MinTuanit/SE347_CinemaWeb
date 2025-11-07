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

  private generateInvoiceCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async create(dto: CreateInvoicesDto) {
    const newInvoice = {
      invoice_id: dto.invoice_id || uuidv4(),
      invoice_code: dto.invoice_code || this.generateInvoiceCode(),
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
      tickets(
        ticket_id,
        price,
        showtimes(
          start_time,
          movies(title)
        ),
        seats(seat_id, seat_label)
      ),
      invoice_products(
        quantity,
        products(product_id, name, price)
      )
    `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(invoice => {
      const ticketsData =
        invoice?.tickets?.map(ticket => ({
          title: ticket.showtimes?.movies?.title || 'Unknown Movie',
          showtime: ticket.showtimes?.start_time || null,
          price: ticket.price || 0,
          seat: ticket.seats
            ? Array.isArray(ticket.seats)
              ? ticket.seats.map(s => s.seat_label)
              : [ticket.seats.seat_label]
            : [],
        })) || [];

      // Get first ticket's info and collect all seats
      const firstTicket = ticketsData[0];
      const allSeats = ticketsData.flatMap(t => t.seat);

      const tickets = firstTicket ? {
        title: firstTicket.title,
        showtime: firstTicket.showtime,
        price: firstTicket.price,
        seats: allSeats,
      } : {
        title: 'Unknown Movie',
        showtime: null,
        price: 0,
        seats: [],
      };

      const products =
        invoice?.invoice_products?.map(ip => ({
          product_id: ip.products?.product_id,
          name: ip.products?.name,
          quantity: ip.quantity,
          price: ip.products?.price || 0,
          total: ip.quantity * (ip.products?.price || 0),
        })) || [];

      const totalTickets = ticketsData.reduce((sum, t) => sum + (t.price || 0), 0);
      const totalProducts = products.reduce((sum, p) => sum + (p.total || 0), 0);
      const totalAmount = totalTickets + totalProducts;

      return {
        invoice_id: invoice.invoice_id,
        invoice_code: invoice.invoice_code,
        customer: invoice.customers,
        ticket_count: ticketsData.length,
        product_count: products.length,
        tickets,
        products,
        payment_method: invoice.payment_method,
        total_amount: totalAmount,
        status: invoice.status,
        created_at: invoice.created_at,
      };
    });
  }

  async findOne(id: string): Promise<InvoicesResponseDto> {
    const { data, error } = await this.supabase
      .from('invoices')
      .select(`
      *,
      customers(customer_id, full_name, email),
      tickets(
        ticket_id,
        price,
        showtimes(
          start_time,
          movies(title)
        ),
        seats(seat_id, seat_label)
      ),
      invoice_products(
        quantity,
        products(product_id, name, price)
      )
    `)
      .eq('invoice_id', id)
      .single();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Invoice ${id} not found`);

    const ticketsData =
      data?.tickets?.map(ticket => ({
        title: ticket.showtimes?.movies?.title || 'Unknown Movie',
        showtime: ticket.showtimes?.start_time || null,
        price: ticket.price || 0,
        seat: ticket.seats
          ? Array.isArray(ticket.seats)
            ? ticket.seats.map(s => s.seat_label)
            : [ticket.seats.seat_label]
          : [],
      })) || [];

    // Get first ticket's info and collect all seats
    const firstTicket = ticketsData[0];
    const allSeats = ticketsData.flatMap(t => t.seat);

    const tickets = firstTicket ? {
      title: firstTicket.title,
      showtime: firstTicket.showtime,
      price: firstTicket.price,
      seats: allSeats,
    } : {
      title: 'Unknown Movie',
      showtime: null,
      price: 0,
      seats: [],
    };

    const products =
      data?.invoice_products?.map(ip => ({
        product_id: ip.products?.product_id,
        name: ip.products?.name,
        quantity: ip.quantity,
        price: ip.products?.price || 0,
        total: ip.quantity * (ip.products?.price || 0),
      })) || [];

    const totalTickets = ticketsData.reduce((sum, t) => sum + (t.price || 0), 0);
    const totalProducts = products.reduce((sum, p) => sum + (p.total || 0), 0);
    const totalAmount = totalTickets + totalProducts;

    return {
      invoice_id: data.invoice_id,
      invoice_code: data.invoice_code,
      customer: data.customers,
      ticket_count: ticketsData.length,
      product_count: products.length,
      tickets,
      products,
      payment_method: data.payment_method,
      total_amount: totalAmount,
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
