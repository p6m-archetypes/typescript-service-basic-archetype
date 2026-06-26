import Fastify, { FastifyInstance } from 'fastify';
import { settings } from './settings';

export interface BuildOptions {
  testing?: boolean;
}

export async function buildApp(opts: BuildOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({
    logger: { level: settings.logLevel },
  });

  // Service routes
  app.get('/', async () => ({ service: '{{ project-name }}', status: 'ok' }));

  return app;
}
