import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacementsService } from './placements.service';
import { PlacementsController } from './placements.controller';
import { Placement } from './entities/placement.entity';
import { College } from 'src/colleges/entities/college.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Placement, College])],
  controllers: [PlacementsController],
  providers: [PlacementsService],
})
export class PlacementsModule {}