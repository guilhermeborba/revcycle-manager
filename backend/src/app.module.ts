import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RevenueCyclesModule } from './revenue-cycles/revenue-cycles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('DB_HOST', 'localhost');
        const port = parseInt(config.get<string>('DB_PORT', '5432'), 10);
        const user = config.get<string>('DB_USER') ?? config.get<string>('DB_USERNAME') ?? 'postgres';
        const pass = config.get<string>('DB_PASSWORD', 'postgres');
        const name = config.get<string>('DB_NAME', 'revcycle_db');

         
        console.log('[DB CONFIG]', {
          host,
          port,
          user,
          passLen: pass?.length ?? 0,
          name,
          NODE_ENV: process.env.NODE_ENV,
          CWD: process.cwd(),
        });

        return {
          type: 'postgres' as const,
          host,
          port,
          username: user,
          password: pass,
          database: name,
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
