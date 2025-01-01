import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { State } from '../states/entities/state.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const { name, stateId } = createCityDto;

    const state = await this.stateRepository.findOne({ where: { id: stateId } });

    if (!state) {
      throw new Error('State not found');
    }

    const city = this.cityRepository.create({
      name,
      state,
    });

    return this.cityRepository.save(city);
  }

  findAll(): Promise<City[]> {
    return this.cityRepository.find({ relations: ['state', 'colleges'] });
  }

  findOne(id: number): Promise<City> {
    return this.cityRepository.findOne({ where: { id }, relations: ['state', 'colleges'] });
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    await this.cityRepository.update(id, updateCityDto);
    return this.cityRepository.findOne({ where: { id }, relations: ['state', 'colleges'] });
  }

  async remove(id: number): Promise<void> {
    await this.cityRepository.delete(id);
  }
}