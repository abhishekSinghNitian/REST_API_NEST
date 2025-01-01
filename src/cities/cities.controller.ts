import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  findAll(): Promise<City[]> {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<City> {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCityDto: UpdateCityDto): Promise<City> {
    return this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.citiesService.remove(id);
  }
}