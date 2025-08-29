import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import type { CreateUserDto } from 'src/users/dto/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const serviceMock: Partial<jest.Mocked<AuthService>> = {
      login: jest.fn().mockResolvedValue({
        access_token: 'signed.jwt.token',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: serviceMock }],
    }).compile();

    controller = module.get(AuthController);
    service = module.get(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login: should delegate to AuthService.login(email, password)', async () => {
    const res = await controller.login({ email: 'tester@example.com', password: 'Secret123!' } as CreateUserDto);

    expect(service.login).toHaveBeenCalledWith(
      'tester@example.com',
      'Secret123!',
    );
    expect(res).toEqual({ access_token: 'signed.jwt.token' });
  });
});