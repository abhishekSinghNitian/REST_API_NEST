import { IsInt, IsNumber } from 'class-validator';

export class CreatePlacementDto {
  @IsInt()
  year: number;

  @IsNumber()
  highestPlacement: number;

  @IsNumber()
  averagePlacement: number;

  @IsNumber()
  medianPlacement: number;

  @IsInt()
  placementRate: number;

  @IsInt()
  collegeId: number;
}