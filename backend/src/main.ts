import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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
      if (!origin) return callback(null, true); 
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
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Gestão do Ciclo de Receita')
    .setDescription('Documentação da API para o desafio de gestão do ciclo de receita hospitalar.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
   
}
bootstrap();
