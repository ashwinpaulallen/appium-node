import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const MAX_BODY_SIZE = 262144000;
  const MAX_PARAM_SIZE = 100;

  const fastifyAdapter = new FastifyAdapter({
    maxParamLength: MAX_PARAM_SIZE,
    bodyLimit: MAX_BODY_SIZE,
    trustProxy: true,
    logger: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  await app.listen(Number(process.env.CUSTOM_SERVER_PORT) || 3000, '0.0.0.0');
}
bootstrap();
