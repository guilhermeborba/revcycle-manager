import { Injectable } from '@nestjs/common';
import { CreateRevenueCycleDto } from './dto/create-revenue-cycle.dto';
import { UpdateRevenueCycleDto } from './dto/update-revenue-cycle.dto';

@Injectable()
export class RevenueCyclesService {
  create(createRevenueCycleDto: CreateRevenueCycleDto) {
    return 'This action adds a new revenueCycle';
  }

  findAll() {
    return `This action returns all revenueCycles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} revenueCycle`;
  }

  update(id: number, updateRevenueCycleDto: UpdateRevenueCycleDto) {
    return `This action updates a #${id} revenueCycle`;
  }

  remove(id: number) {
    return `This action removes a #${id} revenueCycle`;
  }
}
