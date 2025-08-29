import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RevenueCyclesModule } from './revenue-cycles/revenue-cycles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().port().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().min(1).required(),
        DB_NAME: Joi.string().required(),
        DATABASE_URL: Joi.string().uri().optional(),
      }).xor('DATABASE_URL', 'DB_HOST'),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL');

        const base = url
          ? { url }
          : {
              host: config.get<string>('DB_HOST'),
              port: config.get<number>('DB_PORT'),
              username: config.get<string>('DB_USERNAME'),
              password: config.get<string>('DB_PASSWORD'),
              database: config.get<string>('DB_NAME'),
            };

        return {
          type: 'postgres' as const,
          ...base,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),

    UsersModule,
    AuthModule,
    RevenueCyclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
