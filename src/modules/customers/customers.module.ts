import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { SupabaseModule } from 'src/config/supabase.module';

@Module({
  imports:[SupabaseModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
