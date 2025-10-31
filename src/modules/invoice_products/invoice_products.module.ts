import { Module } from '@nestjs/common';
import { Invoice_productsService } from './invoice_products.service';
import { Invoice_productsController } from './invoice_products.controller';

@Module({
  controllers: [Invoice_productsController],
  providers: [Invoice_productsService],
})
export class Invoice_productsModule {}
