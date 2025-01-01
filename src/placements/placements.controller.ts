import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlacementsService } from './placements.service';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';
import { Placement } from './entities/placement.entity';

@Controller('placements')
export class PlacementsController {
  constructor(private readonly placementsService: PlacementsService) {}

  @Post()
  create(@Body() createPlacementDto: CreatePlacementDto): Promise<Placement> {
    return this.placementsService.create(createPlacementDto);
  }

  @Get()
  findAll(): Promise<Placement[]> {
    return this.placementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Placement> {
    return this.placementsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePlacementDto: UpdatePlacementDto): Promise<Placement> {
    return this.placementsService.update(id, updatePlacementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.placementsService.remove(id);
  }

  @Get('average/by-year')
  getAveragePlacementsByYear(): Promise<any> {
    return this.placementsService.getAveragePlacementsByYear();
  }

  @Get('college/:collegeId')
  getPlacementsByCollegeId(@Param('collegeId') collegeId: number): Promise<any> {
    return this.placementsService.getPlacementsByCollegeId(collegeId);
  }
}