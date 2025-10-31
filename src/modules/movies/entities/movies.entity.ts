import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class Movies {
  @PrimaryGeneratedColumn('uuid')
  movie_id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration_min: string;

  @Column()
  release_date: string;

  @Column()
  rating: string;

  @Column()
  poster_url: string;

  @Column()
  director: string;

  @Column()
  actors: string;

  @Column()
  created_at: string;

  @Column()
  genre: string;
}
