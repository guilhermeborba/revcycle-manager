import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsDateString,
  IsOptional,
  Min,
} from 'class-validator';
import { Stage, ClaimStatus } from '../entities/revenue-cycle.enums';

export class CreateRevenueCycleDto {
  @IsString()
  @IsNotEmpty()
  patientId!: string;

  @IsString()
  @IsNotEmpty()
  payer!: string;

  @IsString()
  @IsNotEmpty()
  procedureCode!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  amount!: number;

  @IsEnum(Stage)
  stage!: Stage;

  @IsEnum(ClaimStatus)
  claimStatus!: ClaimStatus;

  @IsDateString()
  dueDate!: string;

  @IsOptional()
  @IsDateString()
  paidDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}