import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
  IsOptional,
  Min,
} from 'class-validator';
import { ClaimStatus, Stage } from '../entities/revenue-cycle.enums';

export class CreateRevenueCycleDto {
  @ApiProperty({ example: 'PATIENT-002' })
  @IsString()
  patientId!: string;

  @ApiProperty({ example: 'Global Health Inc.' })
  @IsString()
  payer!: string;

  @ApiProperty({ example: 'PROC-54321' })
  @IsString()
  procedureCode!: string;

  @ApiProperty({ example: 250.75 })
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty({ enum: Stage, example: Stage.PRE_AUTH })
  @IsEnum(Stage)
  stage!: Stage;

  @ApiProperty({ enum: ClaimStatus, example: ClaimStatus.OPEN })
  @IsEnum(ClaimStatus)
  claimStatus!: ClaimStatus;

  @ApiProperty({ example: '2025-10-15' })
  @IsDateString()
  dueDate!: string;

  @ApiProperty({ example: 'Pre-authorization request.', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
