import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RevenueCyclesService } from './revenue-cycles.service';
import { CreateRevenueCycleDto } from './dto/create-revenue-cycle.dto';
import { UpdateRevenueCycleDto } from './dto/update-revenue-cycle.dto';

@Controller('revenue-cycles')
export class RevenueCyclesController {
  constructor(private readonly revenueCyclesService: RevenueCyclesService) {}

  @Post()
  create(@Body() createRevenueCycleDto: CreateRevenueCycleDto) {
    return this.revenueCyclesService.create(createRevenueCycleDto);
  }

  @Get()
  findAll() {
    return this.revenueCyclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revenueCyclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRevenueCycleDto: UpdateRevenueCycleDto) {
    return this.revenueCyclesService.update(+id, updateRevenueCycleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenueCyclesService.remove(+id);
  }
}
