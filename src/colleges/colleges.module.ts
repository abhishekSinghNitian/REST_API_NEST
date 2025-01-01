import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegesService } from './colleges.service';
import { CollegesController } from './colleges.controller';
import { College } from './entities/college.entity';
import { City } from 'src/cities/entities/city.entity';
import { State } from 'src/states/entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([College, City, State])],
  controllers: [CollegesController],
  providers: [CollegesService],
})
export class CollegesModule {}
