import { Module } from '@nestjs/common';
import { SavesService } from './saves.service';
import { SavesController } from './saves.controller';

@Module({
  providers: [SavesService],
  controllers: [SavesController]
})
export class SavesModule {}
