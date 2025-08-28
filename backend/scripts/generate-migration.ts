import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const name = process.argv[2];
  if (!name) {
    console.error(
      'Informe o nome da migration. Ex: node scripts/generate-migration.js CreateRevenueCycleTable',
    );
    process.exit(1);
  }

  const timestamp = Date.now();
  const filename = `${timestamp}-${name}.ts`;
  const filepath = path.resolve(
    process.cwd(),
    'src',
    'database',
    'migrations',
    filename,
  );

  const template = `import { MigrationInterface, QueryRunner } from "typeorm";

export class ${name}${timestamp} implements MigrationInterface {
    name = '${name}${timestamp}'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(\`
            -- Coloque seu SQL para aplicar a migração (UP) aqui
        \`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(\`
            -- Coloque seu SQL para reverter a migração (DOWN) aqui
        \`);
    }

}
`;

  try {
    await fs.writeFile(filepath, template);
    console.log(`✅ Migração criada com sucesso: ${filepath}`);
    console.log('Agora, edite o arquivo e adicione seu código SQL.');
  } catch (err) {
    console.error('❌ Erro ao criar arquivo de migração:', err);
    process.exit(1);
  }
}

main().catch((err) => console.error(err));
