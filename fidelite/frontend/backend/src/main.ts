import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Transport } from '@nestjs/microservices';
import { LokiLogger } from 'nestjs-loki-logger';
import {
  LoggingInterceptor,
  AllExceptionsFilter,
} from './interceptor/interceptor.interceptor';

// const RABBITMQ_USER = process.env.RABBITMQ_USER;
// const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;
// const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
// const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(LokiLogger));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [
  //       `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
  //     ],
  //     queue: 'fidelity',
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
