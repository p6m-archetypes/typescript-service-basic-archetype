import './otel';
import { buildApp } from './app';
import { serveManagement } from './management';
import { settings } from './settings';

async function main() {
  const app = await buildApp();
  try {
    await Promise.all([
      app.listen({ host: settings.host, port: settings.port }),
      serveManagement(),
    ]);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
