import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = Number(process.env.PORT ?? 3000);

  const CORS_ORIGINS =
    process.env.CORS_ORIGINS ??
    process.env.FRONTEND_URL ??
    '';

  const ORIGINS = CORS_ORIGINS.split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const CORS_CREDENTIALS = String(process.env.CORS_CREDENTIALS ?? 'false') === 'true';
  const CORS_METHODS = process.env.CORS_METHODS ?? 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
  const CORS_ALLOWED_HEADERS = process.env.CORS_ALLOWED_HEADERS ?? 'Content-Type,Authorization';

  const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin) return callback(null, true); // curl/Postman
      if (ORIGINS.length === 0 || ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: CORS_CREDENTIALS,
    methods: CORS_METHODS,
    allowedHeaders: CORS_ALLOWED_HEADERS,
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(PORT);
   
}
bootstrap();
