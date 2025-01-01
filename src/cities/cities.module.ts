import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { City } from './entities/city.entity';
import { State } from '../states/entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, State])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}