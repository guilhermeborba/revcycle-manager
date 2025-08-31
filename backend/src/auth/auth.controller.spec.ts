import 'reflect-metadata';
import type { Request } from 'express';
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    login: jest.fn().mockResolvedValue({ access_token: 'mockToken' }),
  };

  const mockUsersService = {
    findOne: jest.fn((id) => ({
      id,
      name: 'Test User',
      email: 'test@example.com',
    })),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a user profile', async () => {
    const req = {
      user: { userId: '123' },
    } as unknown as Request & { user: { userId: string } };

    const result = await controller.getProfile(req);

    expect(result).toEqual({
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
    });
    expect(mockUsersService.findOne).toHaveBeenCalledWith('123');
  });
});