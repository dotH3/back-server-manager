import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const LISTEN_PORT = Number(process.env.LISTEN_PORT);
  await app.listen(LISTEN_PORT || 3000);
  console.log(`[BACK] > http://localhost:${LISTEN_PORT}`);
}
bootstrap();
