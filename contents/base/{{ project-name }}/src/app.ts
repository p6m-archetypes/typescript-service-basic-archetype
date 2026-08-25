import Fastify, { FastifyInstance } from 'fastify';
import { settings } from './settings';
import { loggerOptions } from './logging';

export interface BuildOptions {
  testing?: boolean;
}

export async function buildApp(opts: BuildOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({
    logger: loggerOptions,
  });

  // Service routes
  app.get('/', async () => ({ service: '{{ project-name }}', status: 'ok' }));

  return app;
}
