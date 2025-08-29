import { PartialType } from '@nestjs/mapped-types';
import { CreateRevenueCycleDto } from './create-revenue-cycle.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ClaimStatus, Stage } from '../entities/revenue-cycle.enums';

export class UpdateRevenueCycleDto extends PartialType(CreateRevenueCycleDto) {
  @ApiPropertyOptional({ enum: Stage })
  @IsOptional()
  @IsEnum(Stage)
  stage?: Stage;

  @ApiPropertyOptional({ enum: ClaimStatus })
  @IsOptional()
  @IsEnum(ClaimStatus)
  claimStatus?: ClaimStatus;

  @ApiPropertyOptional({ example: 'Updated notes' })
  @IsOptional()
  @IsString()
  notes?: string;
}
