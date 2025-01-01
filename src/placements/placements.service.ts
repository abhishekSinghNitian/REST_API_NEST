import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';
import { Placement } from './entities/placement.entity';
import { College } from '../colleges/entities/college.entity';

@Injectable()
export class PlacementsService {
  constructor(
    @InjectRepository(Placement)
    private readonly placementRepository: Repository<Placement>,
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
  ) {}

  async create(createPlacementDto: CreatePlacementDto): Promise<Placement> {
    const { year, highestPlacement, averagePlacement, medianPlacement, placementRate, collegeId } = createPlacementDto;

    const college = await this.collegeRepository.findOne({ where: { id: collegeId } });

    if (!college) {
      throw new Error('College not found');
    }

    const placement = this.placementRepository.create({
      year,
      highestPlacement,
      averagePlacement,
      medianPlacement,
      placementRate,
      college,
    });

    return this.placementRepository.save(placement);
  }

  findAll(): Promise<Placement[]> {
    return this.placementRepository.find({ relations: ['college'] });
  }

  findOne(id: number): Promise<Placement> {
    return this.placementRepository.findOne({ where: { id }, relations: ['college'] });
  }

  async update(id: number, updatePlacementDto: UpdatePlacementDto): Promise<Placement> {
    await this.placementRepository.update(id, updatePlacementDto);
    return this.placementRepository.findOne({ where: { id }, relations: ['college'] });
  }

  async remove(id: number): Promise<void> {
    await this.placementRepository.delete(id);
  }

  async getAveragePlacementsByYear(): Promise<any> {
    const placements = await this.placementRepository
      .createQueryBuilder('placement')
      .select('placement.year', 'year')
      .addSelect('AVG(placement.highestPlacement)', 'avgHighestPlacement')
      .addSelect('AVG(placement.averagePlacement)', 'avgAveragePlacement')
      .addSelect('AVG(placement.medianPlacement)', 'avgMedianPlacement')
      .addSelect('AVG(placement.placementRate)', 'avgPlacementRate')
      .where('placement.highestPlacement IS NOT NULL AND placement.highestPlacement != 0')
      .andWhere('placement.averagePlacement IS NOT NULL AND placement.averagePlacement != 0')
      .andWhere('placement.medianPlacement IS NOT NULL AND placement.medianPlacement != 0')
      .andWhere('placement.placementRate IS NOT NULL AND placement.placementRate != 0')
      .groupBy('placement.year')
      .getRawMany();

    return placements;
  }

  async getPlacementsByCollegeId(collegeId: number): Promise<any> {
    const placements = await this.placementRepository
      .createQueryBuilder('placement')
      .where('placement.collegeId = :collegeId', { collegeId })
      .andWhere('placement.highestPlacement IS NOT NULL AND placement.highestPlacement != 0')
      .andWhere('placement.averagePlacement IS NOT NULL AND placement.averagePlacement != 0')
      .andWhere('placement.medianPlacement IS NOT NULL AND placement.medianPlacement != 0')
      .andWhere('placement.placementRate IS NOT NULL AND placement.placementRate != 0')
      .orderBy('placement.year', 'DESC')
      .getMany();

    if (placements.length < 2) {
      return placements;
    }

    const [latestPlacement, previousPlacement] = placements;

    const placementTrend = latestPlacement.placementRate > previousPlacement.placementRate ? 'UP' : 'DOWN';

    return placements.map((placement, index) => ({
      ...placement,
      placementTrend: index === 0 ? placementTrend : undefined,
    }));
  }
}