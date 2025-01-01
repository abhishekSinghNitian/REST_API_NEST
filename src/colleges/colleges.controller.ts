import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CollegesService } from './colleges.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { College } from './entities/college.entity';

@Controller('colleges')
@UseGuards(JwtAuthGuard)
export class CollegesController {
  constructor(private readonly collegesService: CollegesService) {}

  @Post()
  create(@Body() createCollegeDto: CreateCollegeDto): Promise<College> {
    return this.collegesService.create(createCollegeDto);
  }

  @Get()
  findAll(@Query('city') city?: string, @Query('state') state?: string): Promise<College[]> {
    return this.collegesService.findAll(city, state);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<College> {
    return this.collegesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCollegeDto: UpdateCollegeDto): Promise<College> {
    return this.collegesService.update(id, updateCollegeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.collegesService.remove(id);
  }
}