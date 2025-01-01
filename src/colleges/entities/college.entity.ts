import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { State } from '../../states/entities/state.entity';
import { Course } from '../../courses/entities/course.entity';
import { Placement } from '../../placements/entities/placement.entity';

@Entity()
export class College {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int', default: 0 })
  score: number;

  @ManyToOne(() => City, (city) => city.colleges)
  city: City;

  @ManyToOne(() => State, (state) => state.colleges)
  state: State;

  @OneToMany(() => Placement, (placement) => placement.college)
  placements: Placement[];

  @OneToMany(() => Course, (course) => course.college)
  courses: Course[];
}