import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { College } from '../colleges/entities/college.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { courseName, courseDuration, courseFee, collegeId } = createCourseDto;

    const college = await this.collegeRepository.findOne({ where: { id: collegeId } });

    if (!college) {
      throw new Error('College not found');
    }

    const course = this.courseRepository.create({
      courseName,
      courseDuration,
      courseFee,
      college,
    });

    return this.courseRepository.save(course);
  }

  findAll(): Promise<Course[]> {
    return this.courseRepository.find({ relations: ['college'] });
  }

  findOne(id: number): Promise<Course> {
    return this.courseRepository.findOne({ where: { id }, relations: ['college'] });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    await this.courseRepository.update(id, updateCourseDto);
    return this.courseRepository.findOne({ where: { id }, relations: ['college'] });
  }

  async remove(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }

  async getCoursesByCollegeId(collegeId: number): Promise<Course[]> {
    return this.courseRepository
      .createQueryBuilder('course')
      .where('course.collegeId = :collegeId', { collegeId })
      .orderBy('course.courseFee', 'DESC')
      .getMany();
  }
}