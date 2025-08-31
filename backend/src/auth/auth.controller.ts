import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

type AuthenticatedRequest = Request & {
  user?: { userId: string };
};

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: { email: string; password: string }) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Req() req: AuthenticatedRequest) {
    if (req.user) {
      return this.usersService.findOne(req.user.userId);
    }
  }
}