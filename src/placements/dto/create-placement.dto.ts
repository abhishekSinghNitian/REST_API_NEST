import { IsInt, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePlacementDto {
  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsNumber()
  @IsNotEmpty()
  highestPlacement: number;

  @IsNumber()
  @IsNotEmpty()
  averagePlacement: number;

  @IsNumber()
  @IsNotEmpty()
  medianPlacement: number;

  @IsInt()
  @IsNotEmpty()
  placementRate: number;

  @IsInt()
  @IsNotEmpty()
  collegeId: number;
}