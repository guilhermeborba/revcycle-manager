import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const fullPath = process.argv[2];
  if (!fullPath) {
    console.error(
      'Informe o caminho da migration. Ex: npm run migration:generate src/database/migrations/AddNameToUserTable',
    );
    process.exit(1);
  }

  const name = path.basename(fullPath);

  const timestamp = Date.now();
  const filename = `${timestamp}-${name}.ts`;
  const migrationsDir = path.resolve(
    process.cwd(),
    'src',
    'database',
    'migrations',
  );
  const filepath = path.join(migrationsDir, filename);

  const template = `import { MigrationInterface, QueryRunner } from "typeorm";

export class ${name}${timestamp} implements MigrationInterface {
    name = '${name}${timestamp}'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(\`
            ALTER TABLE "users" ADD "name" character varying NOT NULL
        \`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(\`
            ALTER TABLE "users" DROP COLUMN "name"
        \`);
    }

}
`;

  try {
    await fs.mkdir(migrationsDir, { recursive: true });
    await fs.writeFile(filepath, template);
    console.log(`Migração criada com sucesso: ${filepath}`);
    console.log('O código SQL para adicionar a coluna "name" já foi incluído.');
  } catch (err) {
    console.error('Erro ao criar arquivo de migração:', err);
    process.exit(1);
  }
}

main().catch((err) => console.error(err));