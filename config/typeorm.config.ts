import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { College } from "src/colleges/entities/college.entity";
import { Placement } from "src/placements/entities/placement.entity";
import { State } from "src/states/entities/state.entity";
import { City } from "src/cities/entities/city.entity";
import { Course } from "src/courses/entities/course.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [College, Placement, State, City, Course],
  synchronize: true,
};
