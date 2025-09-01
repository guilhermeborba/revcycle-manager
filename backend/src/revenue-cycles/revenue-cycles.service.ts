import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { RevenueCycle } from './entities/revenue-cycle.entity';
import type { CreateRevenueCycleDto } from './dto/create-revenue-cycle.dto';
import type { UpdateRevenueCycleDto } from './dto/update-revenue-cycle.dto';
import { Stage, ClaimStatus } from './entities/revenue-cycle.enums';

const stageOrder: Stage[] = [Stage.PRE_AUTH, Stage.ATTENDANCE, Stage.BILLING, Stage.ADJUDICATION, Stage.PAYMENT];
const claimStatusOrder: ClaimStatus[] = [ClaimStatus.OPEN, ClaimStatus.APPROVED, ClaimStatus.PAID, ClaimStatus.DENIED, ClaimStatus.CANCELLED];

@Injectable()
export class RevenueCyclesService {
  constructor(
    @InjectRepository(RevenueCycle)
    private readonly revenueCycleRepository: Repository<RevenueCycle>,
  ) {}

  async create(dto: CreateRevenueCycleDto) {
    const entity = this.revenueCycleRepository.create(dto);
    return this.revenueCycleRepository.save(entity);
  }

  findAll() {
    return this.revenueCycleRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const cycle = await this.revenueCycleRepository.findOneBy({ id });
    if (!cycle) {
      throw new NotFoundException(`Revenue cycle with ID "${id}" not found`);
    }
    return cycle;
  }

  async update(id: number, dto: UpdateRevenueCycleDto) {
    const preloaded = await this.revenueCycleRepository.preload({
      id,
      ...dto,
    });
    if (!preloaded) {
      throw new NotFoundException(`Revenue cycle with ID "${id}" not found`);
    }
    return this.revenueCycleRepository.save(preloaded);
  }

  async remove(id: number) {
    const found = await this.revenueCycleRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Revenue cycle with ID "${id}" not found`);
    }
    await this.revenueCycleRepository.delete(id);
    return { deleted: true };
  }

 async advanceStage(id: number): Promise<RevenueCycle> {
    const cycle = await this.findOne(id);
    const currentIndex = stageOrder.indexOf(cycle.stage);

    if (currentIndex < stageOrder.length - 1) {
      cycle.stage = stageOrder[currentIndex + 1];
    }
    
    return this.revenueCycleRepository.save(cycle);
  }

  async advanceStatus(id: number): Promise<RevenueCycle> {
    const cycle = await this.findOne(id);
    const currentIndex = claimStatusOrder.indexOf(cycle.claimStatus);

    const nextIndex = (currentIndex + 1) % claimStatusOrder.length;
    cycle.claimStatus = claimStatusOrder[nextIndex];
    
    return this.revenueCycleRepository.save(cycle);
  } 
}
