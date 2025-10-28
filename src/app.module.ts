import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { AdminsModule } from './admins/admins.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { CustomersModule } from './customers/customers.module';
import { MoviesModule } from './movies/movies.module';
import { ProductsModule } from './products/products.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceProductsModule } from './invoice_products/invoice_products.module';
import { TicketsModule } from './tickets/tickets.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { RoomsModule } from './rooms/rooms.module';
import { SeatsModule } from './seats/seats.module';
import { SavesModule } from './saves/saves.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    // Configuration module - load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Feature modules
    AuthModule,
    ItemsModule,
    AdminsModule,
    CinemasModule,
    CustomersModule,
    MoviesModule,
    ProductsModule,
    InvoicesModule,
    InvoiceProductsModule,
    TicketsModule,
    ShowtimesModule,
    RoomsModule,
    SeatsModule,
    SavesModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
