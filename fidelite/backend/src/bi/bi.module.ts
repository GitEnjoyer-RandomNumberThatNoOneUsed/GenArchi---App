import { Module } from '@nestjs/common';
import { BiController } from './bi.controller';
import { BiService } from './bi.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();
const RABBITMQ_USER = process.env.RABBITMQ_USER || 'user';
const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD || 'password';
const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'rabbitmq';
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || 5672;

@Module({
  controllers: [BiController],
  providers: [BiService],
  imports: [
    ClientsModule.register([
      {
        name: 'BI_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
          ],
          queue: 'bi',
        },
      },
    ]),
  ],
})
export class BiModule {}
