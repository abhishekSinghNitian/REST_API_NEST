import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCollegeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @IsNumber()
  @IsNotEmpty()
  stateId: number;
}