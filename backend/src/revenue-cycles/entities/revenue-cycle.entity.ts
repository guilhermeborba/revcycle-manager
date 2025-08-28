import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Stage, ClaimStatus } from './revenue-cycle.enums';

@Entity('revenue_cycles')
export class RevenueCycle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  patientId!: string;

  @Column()
  payer!: string;

  @Column()
  procedureCode!: string;

  @Column('numeric', { precision: 10, scale: 2 })
  amount!: number;

  @Column({
    type: 'enum',
    enum: Stage,
  })
  stage!: Stage;

  @Column({
    type: 'enum',
    enum: ClaimStatus,
  })
  claimStatus!: ClaimStatus;

  @Column({ type: 'date' })
  dueDate!: Date;

  @Column({ type: 'date', nullable: true })
  paidDate!: Date | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
