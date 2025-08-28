import 'dotenv/config';
import { execSync } from 'node:child_process';

const name = process.argv[2];
if (!name) {
  console.error(
    'Informe o nome da migration: npm run m:generate:prog CreateUsersTable',
  );
  process.exit(1);
}

try {
  execSync(
    `npx typeorm-ts-node-commonjs migration:generate src/database/migrations/${name} -d typeorm.config.ts`,
    { stdio: 'inherit' },
  );
} catch (err) {
  console.error('Erro ao gerar migration:', err);
  process.exit(1);
}
