import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateCollegeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  score: number;

  @IsInt()
  cityId: number;

  @IsInt()
  stateId: number;
}