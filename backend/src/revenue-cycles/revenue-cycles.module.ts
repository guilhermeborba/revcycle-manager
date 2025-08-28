import { Module } from '@nestjs/common';
import { RevenueCyclesService } from './revenue-cycles.service';
import { RevenueCyclesController } from './revenue-cycles.controller';

@Module({
  controllers: [RevenueCyclesController],
  providers: [RevenueCyclesService],
})
export class RevenueCyclesModule {}
