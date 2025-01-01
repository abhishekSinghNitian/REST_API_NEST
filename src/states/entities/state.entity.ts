import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { College } from '../../colleges/entities/college.entity';
import { City } from 'src/cities/entities/city.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => College, (college) => college.state)
  colleges: College[];
  cities: City[];
}