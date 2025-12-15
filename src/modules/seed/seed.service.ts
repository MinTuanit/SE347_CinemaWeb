import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CustomersService } from '../customers/customers.service';
import { CinemasService } from '../cinemas/cinemas.service';
import { RoomsService } from '../rooms/rooms.service';
import { MoviesService } from '../movies/movies.service';
import { ProductsService } from '../products/products.service';
import { ShowtimesService } from '../showtimes/showtimes.service';

@Injectable()
export class SeedService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabase: SupabaseClient,
    private readonly customersService: CustomersService,
    private readonly cinemasService: CinemasService,
    private readonly roomsService: RoomsService,
    private readonly moviesService: MoviesService,
    private readonly productsService: ProductsService,
    private readonly showtimesService: ShowtimesService,
  ) { }

  async seed() {
    try {
      // Seed customers
      const customerDtos = [
        {
          full_name: 'Nguyen Van A',
          email: 'customer1@example.com',
          password: 'password123',
          phone_number: '0123456789',
          created_at: new Date().toISOString(),
          cccd: '123456789012',
          dob: new Date('1990-01-01'),
        },
        {
          full_name: 'Tran Thi B',
          email: 'customer2@example.com',
          password: 'password123',
          phone_number: '0987654321',
          created_at: new Date().toISOString(),
          cccd: '987654321098',
          dob: new Date('1992-02-02'),
        },
      ];

      for (const dto of customerDtos) {
        await this.customersService.create(dto);
      }

      // Seed cinemas
      const cinemaDtos = [
        {
          name: 'Cinema City',
          address: '123 Main St, Hanoi',
        },
        {
          name: 'Galaxy Cinema',
          address: '456 Le Loi, Ho Chi Minh City',
        },
      ];

      const createdCinemas: any[] = [];
      for (const dto of cinemaDtos) {
        const cinema = await this.cinemasService.create(dto);
        createdCinemas.push(cinema);
      }
      const cinemaIds = createdCinemas.map(c => c.cinema_id);

      // Seed rooms with seats
      const roomDtos: any[] = [];
      const roomIds: string[] = [];
      for (const cinemaId of cinemaIds) {
        for (let i = 1; i <= 2; i++) {
          const seatsForRoom: any[] = [];
          for (let row = 1; row <= 10; row++) {
            for (let col = 1; col <= 10; col++) {
              seatsForRoom.push({
                row: row,
                column: col,
                seat_label: String.fromCharCode(64 + row) + col,
              });
            }
          }
          roomDtos.push({
            cinema_id: cinemaId,
            name: `Room ${i}`,
            seats: seatsForRoom,
          });
        }
      }

      for (const dto of roomDtos) {
        const room = await this.roomsService.create(dto);
        roomIds.push(room.room_id);
      }

      // Seed movies
      const movieDtos = [
        {
          title: 'Avengers: Endgame',
          description: 'Superhero movie',
          duration_min: 180,
          release_date: '2023-04-26',
          rating: 'PG-13',
          poster_url: 'https://cdn.galaxycine.vn/media/2019/4/10/640wx396h_1554864314405.jpg',
          director: 'Anthony Russo',
          actors: ['Robert Downey Jr.', 'Chris Evans'],
          genre: ['Action', 'Adventure'],
        },
        {
          title: 'Nhà Gia Tiên',
          description: 'Vietnamese horror movie',
          duration_min: 120,
          release_date: '2023-05-01',
          rating: 'R',
          poster_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRed6AMI3GCIZF7_QtrFEkXOYkWYxzadM51Vw&s',
          director: 'Nguyen Vinh Sơn',
          actors: ['Huynh Lap', 'La Thanh'],
          genre: ['Horror'],
        },
        {
          title: 'The Dark Knight',
          description: 'Batman movie',
          duration_min: 152,
          release_date: '2023-05-10',
          rating: 'PG-13',
          poster_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ekE6Hhz9gvIbiFSUPxt-FyAh4zXTXX0bjQ&s',
          director: 'Christopher Nolan',
          actors: ['Christian Bale', 'Heath Ledger'],
          genre: ['Action', 'Crime'],
        },
      ];

      const createdMovies: any[] = [];
      for (const dto of movieDtos) {
        const movie = (await this.moviesService.create(dto))[0];
        createdMovies.push(movie);
      }
      const movieIds = createdMovies.map(m => m.movie_id);

      // Seed products
      const productDtos = [
        {
          name: 'Popcorn',
          price: 50000.0,
          category: 'food',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW2xjp9wlBo_WcLzf7ig80TRHsZePHmlmEhQ&s',
        },
        {
          name: 'Coke',
          price: 40000.0,
          category: 'drink',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-V-t7QDcLgBX6QteHAH2mwSihNGlMXlamA&s',
        },
        {
          name: 'Sprite',
          price: 40000.0,
          category: 'drink',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiZXgnEg5H6gF1dk-asdilmlseSOADTtxe8A&s',
        },
        {
          name: 'Popcorn combo1',
          price: 80000.0,
          category: 'other',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8KaaxhLbViKKnzGRu8XkqDIMbVYCydu4q2Q&s',
        },
      ];

      for (const dto of productDtos) {
        await this.productsService.create(dto);
      }

      // Seed showtimes
      const showtimeDtos: any[] = [];
      const now = new Date();
      for (let day = 1; day <= 5; day++) {
        const date = new Date(now);
        date.setDate(now.getDate() + day);
        for (const movie of createdMovies) {
          for (const roomId of roomIds) {
            // 2 showtimes per day per movie per room
            for (let time = 10; time <= 20; time += 5) {
              const startTime = new Date(date);
              startTime.setHours(time, 0, 0, 0);
              const endTime = new Date(startTime);
              endTime.setMinutes(startTime.getMinutes() + movie.duration_min);

              showtimeDtos.push({
                movie_id: movie.movie_id,
                room_id: roomId,
                start_time: startTime.toISOString(),
                end_time: endTime.toISOString(),
                price: 45000.0,
              });
            }
          }
        }
      }

      for (const dto of showtimeDtos) {
        await this.showtimesService.create(dto);
      }

      return { message: 'Seeding completed successfully' };
    } catch (error) {
      throw new Error(`Seeding failed: ${error.message}`);
    }
  }

  async clear() {
    await this.supabase.from('showtimes').delete().not('showtime_id', 'is', null);
    await this.supabase.from('products').delete().not('product_id', 'is', null);
    await this.supabase.from('movies').delete().not('movie_id', 'is', null);
    await this.supabase.from('seats').delete().not('seat_id', 'is', null);
    await this.supabase.from('rooms').delete().not('room_id', 'is', null);
    await this.supabase.from('cinemas').delete().not('cinema_id', 'is', null);
    const { data, error } = await this.supabase.from('customers').delete().not('customer_id', 'is', null);
    console.log('Delete result:', data, error);
    return { message: 'Data cleared' };
  }
}