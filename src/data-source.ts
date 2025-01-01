import { DataSource } from 'typeorm';
import { State } from './states/entities/state.entity';
import { City } from './cities/entities/city.entity';
import { College } from './colleges/entities/college.entity';
import { Course } from './courses/entities/course.entity';
import { Placement } from './placements/entities/placement.entity';
import { User } from './users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres', // or your database type
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Abhi@07102003',
  database: 'sports_duniya',
  entities: [State, City, College, Course, Placement, User],
  synchronize: true,
});