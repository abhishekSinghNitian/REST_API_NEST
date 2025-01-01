import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { College } from '../../colleges/entities/college.entity';

@Entity()
export class Placement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column({ type: 'float' })
  highestPlacement: number;

  @Column({ type: 'float' })
  averagePlacement: number;

  @Column({ type: 'float' })
  medianPlacement: number;

  @Column({ type: 'float' })
  placementRate: number;

  @ManyToOne(() => College, (college) => college.placements)
  college: College;
}