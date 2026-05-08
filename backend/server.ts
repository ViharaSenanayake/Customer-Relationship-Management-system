import app from './app';
import { env } from './config/env';
import { initDb } from './prisma/db/init';

async function start() {
  await initDb();
  app.listen(env.PORT, () => {
    console.log(`✅ Server running at http://localhost:${env.PORT}`);
    console.log(`🌍 Environment: ${env.NODE_ENV}`);
  });
}

start().catch((err) => {
  console.error('❌ Failed to start server', err);
  process.exit(1);
});
