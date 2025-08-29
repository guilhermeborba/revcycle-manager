import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueCyclesController } from './revenue-cycles.controller';
import { RevenueCyclesService } from './revenue-cycles.service';
import { RevenueCycle } from './entities/revenue-cycle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RevenueCycle])],
  controllers: [RevenueCyclesController],
  providers: [RevenueCyclesService],
  exports: [RevenueCyclesService], // (opcional) exporta para outros módulos se precisar
})
export class RevenueCyclesModule {}
