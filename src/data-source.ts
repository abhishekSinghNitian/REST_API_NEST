import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { State } from './states/entities/state.entity';
import { City } from './cities/entities/city.entity';
import { College } from './colleges/entities/college.entity';
import { Course } from './courses/entities/course.entity';
import { Placement } from './placements/entities/placement.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, State, City, College, Course, Placement],
  synchronize: false,
});