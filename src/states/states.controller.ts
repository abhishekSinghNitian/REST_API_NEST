import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post()
  create(@Body() createStateDto: CreateStateDto): Promise<State> {
    return this.statesService.create(createStateDto);
  }

  @Get()
  findAll(): Promise<State[]> {
    return this.statesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<State> {
    return this.statesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStateDto: UpdateStateDto): Promise<State> {
    return this.statesService.update(id, updateStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.statesService.remove(id);
  }
}