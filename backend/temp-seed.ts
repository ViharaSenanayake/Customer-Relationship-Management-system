import { initDb } from './prisma/db/init';

initDb()
  .then(() => {
    console.log('Database seeded successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
