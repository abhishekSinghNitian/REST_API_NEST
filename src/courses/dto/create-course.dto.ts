import { IsString, IsNotEmpty, IsInt, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  courseName: string;

  @IsString()
  @IsNotEmpty()
  courseDuration: string;

  @IsNumber()
  courseFee: number;

  @IsInt()
  collegeId: number;
}