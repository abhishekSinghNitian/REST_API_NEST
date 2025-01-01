import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  create(createStateDto: CreateStateDto): Promise<State> {
    const state = this.stateRepository.create(createStateDto);
    return this.stateRepository.save(state);
  }

  findAll(): Promise<State[]> {
    return this.stateRepository.find();
  }

  findOne(id: number): Promise<State> {
    return this.stateRepository.findOne({ where: { id } });
  }

  async update(id: number, updateStateDto: UpdateStateDto): Promise<State> {
    await this.stateRepository.update(id, updateStateDto);
    return this.stateRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.stateRepository.delete(id);
  }
}