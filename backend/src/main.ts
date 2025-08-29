import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupSwagger } from './swagger';
import { json, urlencoded } from 'express';
import type { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '2mb' }));
  app.use(urlencoded({ extended: true }));

  app.use((req: Request, _res: Response, next: NextFunction) => {
    if (req.path === '/auth/register' || req.path === '/auth/login') {
       
      console.log('[DEBUG pre-pipe]', req.path, 'body =', req.body);
    }
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validationError: { target: false, value: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app);

  await app.listen(process.env.PORT || 3000);
}
void bootstrap();
