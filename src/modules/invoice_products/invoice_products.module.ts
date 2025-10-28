import { Module } from '@nestjs/common';
import { InvoiceProductsService } from './invoice_products.service';
import { InvoiceProductsController } from './invoice_products.controller';

@Module({
  providers: [InvoiceProductsService],
  controllers: [InvoiceProductsController]
})
export class InvoiceProductsModule {}
