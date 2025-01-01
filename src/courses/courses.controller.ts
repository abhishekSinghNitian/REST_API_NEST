import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto): Promise<Course> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.coursesService.remove(id);
  }

  @Get('college/:collegeId')
  getCoursesByCollegeId(@Param('collegeId') collegeId: number): Promise<Course[]> {
    return this.coursesService.getCoursesByCollegeId(collegeId);
  }
}