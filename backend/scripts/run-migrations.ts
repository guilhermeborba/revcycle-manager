import 'dotenv/config';
import dataSource from '../typeorm.config';

async function main() {
  try {
    const ds = await dataSource.initialize();
    const applied = await ds.runMigrations({ transaction: 'all' });
    console.log(
      'Migrations aplicadas:',
      applied.map((m) => m.name),
    );
    await ds.destroy();
  } catch (err) {
    console.error('Erro ao rodar migrations:', err);
  }
}

main().catch((err) => console.error(err));
