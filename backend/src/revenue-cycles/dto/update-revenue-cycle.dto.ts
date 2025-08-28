import { PartialType } from '@nestjs/mapped-types';
import { CreateRevenueCycleDto } from './create-revenue-cycle.dto';

export class UpdateRevenueCycleDto extends PartialType(CreateRevenueCycleDto) {}
