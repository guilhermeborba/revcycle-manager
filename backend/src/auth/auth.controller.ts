import { Body, Controller, Get, Inject, Post, Req, UseGuards, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
 import { CreateUserDto } from '../users/dto/create-user.dto';
import type { Request } from 'express';
 
const __keepCreateUserDtoAsValue = CreateUserDto;

type JwtRequest = Request & {
  user?: { userId: string | number; email: string };
};

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: JwtRequest) {
    return { user: req.user };
  }
}
