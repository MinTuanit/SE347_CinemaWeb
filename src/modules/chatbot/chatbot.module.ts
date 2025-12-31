import { Module } from '@nestjs/common';
import { GeminiController } from './chatbot.controller';
import { GeminiService } from './chatbot.service';
import { MoviesModule } from '../movies/movies.module';
import { ShowtimesModule } from '../showtimes/showtimes.module';
import { CinemasModule } from '../cinemas/cinemas.module';

@Module({
  imports: [MoviesModule, ShowtimesModule, CinemasModule],
  controllers: [GeminiController],
  providers: [GeminiService],
})
export class ChatbotModule {}
