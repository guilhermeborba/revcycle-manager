 
import {
  Inject,
  Injectable,
  UnauthorizedException,
  ConflictException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import type { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(pass, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(dto: CreateUserDto) {
    const exists = await this.usersService.findOneByEmail(dto.email);
    if (exists) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({ email: dto.email, password: hashed });

    const payload = { sub: user.id, email: user.email };
    return {
      id: user.id,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
