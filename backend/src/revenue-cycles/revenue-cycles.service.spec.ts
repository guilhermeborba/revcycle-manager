import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { RevenueCyclesService } from './revenue-cycles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RevenueCycle } from './entities/revenue-cycle.entity';
import { NotFoundException } from '@nestjs/common';
import type { CreateRevenueCycleDto } from './dto/create-revenue-cycle.dto';
import type { UpdateRevenueCycleDto } from './dto/update-revenue-cycle.dto';
import { Stage, ClaimStatus } from './entities/revenue-cycle.enums';

describe('RevenueCyclesService', () => {
  let service: RevenueCyclesService;
  let repo: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOneBy: jest.Mock;
    preload: jest.Mock;
    delete: jest.Mock;
  };

  // Função helper para criar entidades mock completas
  const createMockRevenueCycle = (overrides: Partial<RevenueCycle> = {}): RevenueCycle => ({
    id: 1,
    patientId: 'PATIENT-001',
    payer: 'HealthPlus Insurance',
    procedureCode: 'PROC-10001',
    amount: 320.5,
    stage: Stage.PRE_AUTH,
    claimStatus: ClaimStatus.OPEN,
    dueDate: new Date('2025-09-30'),
    paidDate: null,
    notes: 'Initial request sent.',
    createdAt: new Date('2025-08-01'),
    updatedAt: new Date('2025-08-01'),
    ...overrides,
  } as RevenueCycle);

  beforeEach(async () => {
    repo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      preload: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevenueCyclesService,
        {
          provide: getRepositoryToken(RevenueCycle),
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get(RevenueCyclesService);
  });

  it('create: should create and save', async () => {
    const dueDate = '2025-12-31';
    const dto: CreateRevenueCycleDto = { 
      patientId: 'P1',
      payer: 'Test Payer',
      procedureCode: 'TEST-001',
      amount: 100,
      stage: Stage.PRE_AUTH,
      claimStatus: ClaimStatus.OPEN,
      dueDate: dueDate,
    };
    
    const entity = createMockRevenueCycle({ 
      ...dto, 
      id: 1,
      dueDate: new Date(dueDate) 
    });
    
    repo.create.mockReturnValue(dto);
    repo.save.mockResolvedValue(entity);

    const res = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalled();
    expect(res).toEqual(entity);
  });

  it('findAll: should return list', async () => {
    const entities = [
      createMockRevenueCycle({ id: 1 }),
      createMockRevenueCycle({ id: 2 })
    ];
    repo.find.mockResolvedValue(entities);
    
    const res = await service.findAll();
    expect(res).toEqual(entities);
  });

  it('findOne: should return item when it exists', async () => {
    const entity = createMockRevenueCycle({ id: 2 });
    repo.findOneBy.mockResolvedValue(entity);
    
    const res = await service.findOne(2);
    expect(res).toEqual(entity);
  });

  it('findOne: should throw NotFoundException when item does not exist', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('update: should update when item exists', async () => {
    const entity = createMockRevenueCycle({ id: 3, notes: 'Updated notes' });
    repo.preload.mockResolvedValue(entity);
    repo.save.mockResolvedValue(entity);

    const updateDto: UpdateRevenueCycleDto = { notes: 'Updated notes' };
    const res = await service.update(3, updateDto);
    
    expect(repo.preload).toHaveBeenCalledWith({ id: 3, ...updateDto });
    expect(repo.save).toHaveBeenCalledWith(entity);
    expect(res).toEqual(entity);
  });

  it('update: should throw NotFoundException when item does not exist', async () => {
    repo.preload.mockResolvedValue(undefined);
    
    const updateDto: UpdateRevenueCycleDto = { notes: 'new' };
    await expect(service.update(7, updateDto)).rejects.toBeInstanceOf(NotFoundException);
    
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('remove: should delete when item exists', async () => {
    const entity = createMockRevenueCycle({ id: 10 });
    repo.findOneBy.mockResolvedValue(entity);
    repo.delete.mockResolvedValue({ affected: 1 });
    
    const res = await service.remove(10);
    expect(res).toEqual({ deleted: true });
  });

  it('remove: should throw NotFoundException when item does not exist', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.remove(10)).rejects.toBeInstanceOf(NotFoundException);
    expect(repo.delete).not.toHaveBeenCalled();
  });
});