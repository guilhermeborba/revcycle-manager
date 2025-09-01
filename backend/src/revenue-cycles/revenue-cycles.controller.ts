import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RevenueCyclesService } from './revenue-cycles.service';
import { CreateRevenueCycleDto } from './dto/create-revenue-cycle.dto';
import { UpdateRevenueCycleDto } from './dto/update-revenue-cycle.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('revenue-cycles')
@UseGuards(AuthGuard('jwt'))
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.revenueCyclesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRevenueCycleDto: UpdateRevenueCycleDto,
  ) {
    return this.revenueCyclesService.update(id, updateRevenueCycleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.revenueCyclesService.remove(id);
  }
}