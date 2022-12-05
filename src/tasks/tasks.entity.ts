import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './tasks.enum';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
