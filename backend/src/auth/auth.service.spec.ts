import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { User } from 'src/users/entities/user.entity';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  const bcryptCompare = bcrypt.compare as jest.Mock<Promise<boolean>, [string, string]>;
  const bcryptHash = bcrypt.hash as jest.Mock<Promise<string>, [string, number]>;

  beforeEach(async () => {
    const usersMock: Partial<jest.Mocked<UsersService>> = {
      findOneByEmail: jest.fn(),
      create: jest.fn(),
    };

    const jwtMock: Partial<jest.Mocked<JwtService>> = {
      sign: jest.fn().mockReturnValue('signed.jwt.token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersMock },
        { provide: JwtService, useValue: jwtMock },
      ],
    }).compile();

    service = module.get(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);

    bcryptCompare.mockReset();
    bcryptHash.mockReset();
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login: should return access_token when credentials are valid', async () => {
    const mockUser: Partial<User> = {
      id: '1',
      email: 'tester@example.com',
      password: 'hashed-pass',
    };

    usersService.findOneByEmail.mockResolvedValue(mockUser as User);
 
    bcryptCompare.mockResolvedValue(true);

    const res = await service.login('tester@example.com', 'Secret123!');
    expect(usersService.findOneByEmail).toHaveBeenCalledWith('tester@example.com');
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: '1',
      email: 'tester@example.com',
    });
    expect(res).toEqual({ access_token: 'signed.jwt.token' });
  });

  it('login: should throw UnauthorizedException when user does not exist', async () => {
    usersService.findOneByEmail.mockResolvedValue(null);

    await expect(
      service.login('naoexiste@example.com', 'x'),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.sign).not.toHaveBeenCalled();
  });

  it('login: should throw UnauthorizedException when password does not match', async () => {
    const mockUser: Partial<User> = {
      id: '1',
      email: 'tester@example.com',
      password: 'hashed-pass',
    };

    usersService.findOneByEmail.mockResolvedValue(mockUser as User);

    bcryptCompare.mockResolvedValue(false);

    await expect(
      service.login('tester@example.com', 'wrongpassword'),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.sign).not.toHaveBeenCalled();
  });
});