import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { RevenueCycle } from './entities/revenue-cycle.entity';
import type { CreateRevenueCycleDto } from './dto/create-revenue-cycle.dto';
import type { UpdateRevenueCycleDto } from './dto/update-revenue-cycle.dto';

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
    return this.revenueCycleRepository.find();
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
}
