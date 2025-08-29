import { Controller, Get, Inject, Param, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  @Get()
  list() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
