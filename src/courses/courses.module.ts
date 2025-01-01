import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';
import { College } from 'src/colleges/entities/college.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, College])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}