// src/main.ts  (or the very first file that runs)
//Redployment Restart Commit
import { webcrypto } from 'crypto';

if (typeof globalThis.crypto === 'undefined') {
  // Define once, as a non‑writable property
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    configurable: false,
    enumerable: false,
    writable: false,
  });
}
// ───────────────────────────────────────────────

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['https://timer4u.vercel.app'],
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
