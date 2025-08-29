import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { RevenueCyclesService } from './revenue-cycles.service';
import { AuthGuard } from '@nestjs/passport'; 
import { CreateRevenueCycleDto } from './dto/create-revenue-cycle.dto';
import { UpdateRevenueCycleDto } from './dto/update-revenue-cycle.dto';
 
const __keepCreateAsValue = CreateRevenueCycleDto; 
const __keepUpdateAsValue = UpdateRevenueCycleDto;

@UseGuards(AuthGuard('jwt'))
@Controller('revenue-cycles')
export class RevenueCyclesController {
  constructor(
    @Inject(forwardRef(() => RevenueCyclesService))
    private readonly revenueCyclesService: RevenueCyclesService,
  ) {}

  @Post()
  create(@Body() dto: CreateRevenueCycleDto) {
    return this.revenueCyclesService.create(dto);
  }

  @Get()
  findAll() {
    return this.revenueCyclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.revenueCyclesService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRevenueCycleDto) {
    return this.revenueCyclesService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.revenueCyclesService.remove(Number(id));
  }
}
