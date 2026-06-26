import { config } from 'dotenv';
config();

export const settings = {
  host: process.env.HOST ?? '0.0.0.0',
  port: parseInt(process.env.SERVER_PORT ?? '{{ service_port }}', 10),
  managementPort: parseInt(process.env.MANAGEMENT_PORT ?? '{{ management_port }}', 10),
  logLevel: process.env.LOG_LEVEL ?? 'info',
  loggingStructured: (process.env.LOGGING_STRUCTURED ?? 'false') === 'true',
} as const;

export type Settings = typeof settings;
