import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { College } from '../../colleges/entities/college.entity';
import { State } from '../../states/entities/state.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => State, (state) => state.cities)
  state: State;

  @OneToMany(() => College, (college) => college.city)
  colleges: College[];
}