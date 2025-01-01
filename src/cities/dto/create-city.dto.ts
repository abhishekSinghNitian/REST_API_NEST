import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  stateId: number;
}