import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { State } from './states/entities/state.entity';
import { City } from './cities/entities/city.entity';
import { College } from './colleges/entities/college.entity';
import { Course } from './courses/entities/course.entity';
import { Placement } from './placements/entities/placement.entity';

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [User, State, City, College, Course, Placement],
  synchronize: false,
});