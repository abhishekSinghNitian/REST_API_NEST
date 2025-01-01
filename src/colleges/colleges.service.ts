import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { College } from './entities/college.entity';
import { City } from '../cities/entities/city.entity';
import { State } from '../states/entities/state.entity';

@Injectable()
export class CollegesService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async create(createCollegeDto: CreateCollegeDto): Promise<College> {
    const { name, score, cityId, stateId } = createCollegeDto;

    const city = await this.cityRepository.findOne({ where: { id: cityId } });
    const state = await this.stateRepository.findOne({ where: { id: stateId } });

    if (!city || !state) {
      throw new Error('City or State not found');
    }

    const college = this.collegeRepository.create({
      name,
      score,
      city,
      state,
    });

    return this.collegeRepository.save(college);
  }

  async findAll(city?: string, state?: string): Promise<College[]> {
    const query = this.collegeRepository.createQueryBuilder('college')
      .leftJoinAndSelect('college.city', 'city')
      .leftJoinAndSelect('college.state', 'state');

    if (city) {
      query.andWhere('city.name = :city', { city });
    }

    if (state) {
      query.andWhere('state.name = :state', { state });
    }

    return query.getMany();
  }

  findOne(id: number): Promise<College> {
    return this.collegeRepository.findOne({ where: { id }, relations: ['city', 'state', 'courses', 'placements'] });
  }

  async update(id: number, updateCollegeDto: UpdateCollegeDto): Promise<College> {
    await this.collegeRepository.update(id, updateCollegeDto);
    return this.collegeRepository.findOne({ where: { id }, relations: ['city', 'state', 'courses', 'placements'] });
  }

  async remove(id: number): Promise<void> {
    await this.collegeRepository.delete(id);
  }
}