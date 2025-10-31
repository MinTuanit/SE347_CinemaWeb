import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('seats')
export class Seats {
  @PrimaryGeneratedColumn('uuid')
  seat_id: string;

  @PrimaryGeneratedColumn('uuid')
  room_id: string;

  @Column()
  row: string;

  @Column()
  col: string;

  @Column()
  seat_label: string;
}
