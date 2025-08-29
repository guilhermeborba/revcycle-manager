import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

void AppService;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  health() {
    return {
      status: 'ok',
      message: this.appService.getHello(),
      timestamp: new Date().toISOString(),
    };
  }
}
