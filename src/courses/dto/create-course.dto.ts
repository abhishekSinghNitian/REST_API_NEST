import { IsString, IsNotEmpty, IsInt, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  courseName: string;

  @IsString()
  @IsNotEmpty()
  courseDuration: string;

  @IsNumber()
  @IsNotEmpty()
  courseFee: number;

  @IsInt()
  @IsNotEmpty()
  collegeId: number;
}