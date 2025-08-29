import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'revcycle_db',
  entities: [path.resolve(__dirname, 'src/**/*.entity.{ts,js}')],
  migrations: [path.resolve(__dirname, 'src/database/migrations/*.{ts,js}')],
  synchronize: false,
  logging: true,
  extra: { connectionTimeoutMillis: 5000 },
});
