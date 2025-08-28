import 'dotenv/config';
import dataSource from '../typeorm.config';

async function main() {
  try {
    const ds = await dataSource.initialize();
    const hasPending = await ds.showMigrations();
    console.log('Há migrations pendentes?', hasPending);
    await ds.destroy();
  } catch (err) {
    console.error('Erro ao mostrar migrations:', err);
  }
}

main().catch((err) => console.error(err));
