// gemini.service.ts
import { Injectable } from '@nestjs/common';
import { MoviesService } from '../movies/movies.service';
import { ShowtimesService } from '../showtimes/showtimes.service';
import { CinemasService } from '../cinemas/cinemas.service';

@Injectable()
export class GeminiService {
  private readonly apiKey = process.env.VITE_GEMINI_API_KEY;
  // Use v1 endpoint with a public model that supports generateContent
  private readonly apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

  constructor(
    private readonly moviesService: MoviesService,
    private readonly showtimesService: ShowtimesService,
    private readonly cinemasService: CinemasService,
  ) {}

  async chat(
    message: string,
    history: Array<{ role: string; content: string }> = [],
  ) {
    const contents: Array<{
      role: string;
      parts: Array<{ text: string }>;
    }> = [];

    contents.push({
      role: 'user',
      parts: [
        {
          text: `You are a helpful cinema assistant for "Absolute Cinema". 
You help customers with:
- Movie information and recommendations
- Showtimes and booking assistance
- Cinema locations and facilities
- Ticket pricing and promotions
- General cinema-related questions

Please provide friendly, concise, and helpful responses.
If you don't know something specific about our cinema, be honest and suggest contacting customer service.`,
        },
      ],
    });

    contents.push({
      role: 'model',
      parts: [{ text: 'I understand. How can I help?' }],
    });

    history.slice(-4).forEach((h) => {
      contents.push({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }],
      });
    });

    contents.push({ role: 'user', parts: [{ text: message }] });

    const res = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Gemini API failed ${res.status}: ${errorText || res.statusText}`,
      );
    }

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      // log entire response to debug empty reply cases
      console.warn('Gemini empty reply', data);
      throw new Error('Gemini did not return a reply');
    }

    return reply;
  }
}
