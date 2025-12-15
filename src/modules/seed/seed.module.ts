import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CustomersModule } from '../customers/customers.module';
import { CinemasModule } from '../cinemas/cinemas.module';
import { RoomsModule } from '../rooms/rooms.module';
import { SeatsModule } from '../seats/seats.module';
import { MoviesModule } from '../movies/movies.module';
import { ProductsModule } from '../products/products.module';
import { ShowtimesModule } from '../showtimes/showtimes.module';
import { SupabaseModule } from 'src/config/supabase.module';
@Module({
  imports: [
    SupabaseModule,
    CustomersModule,
    CinemasModule,
    RoomsModule,
    SeatsModule,
    MoviesModule,
    ProductsModule,
    ShowtimesModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule { }