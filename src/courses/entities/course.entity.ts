import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { College } from '../../colleges/entities/college.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseName: string;

  @Column()
  courseDuration: string;

  @Column({ type: 'float' })
  courseFee: number;

  @ManyToOne(() => College, (college) => college.courses)
  college: College;
}