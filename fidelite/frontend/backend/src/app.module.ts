import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { LokiLoggerModule } from 'nestjs-loki-logger';
import { HealthModule } from './health/health.module';
import { Sprint0Module } from './sprint0/sprint0.module';
import { FidelityModule } from './fidelity/fidelity.module';
import { BiModule } from './bi/bi.module';
import * as dotenv from 'dotenv';

dotenv.config();
const LOKI_URL = process.env.LOKI_URL || 'loki';
const LOKI_PORT = process.env.LOKI_PORT || 3100;
const APPNAME = process.env.APP_NAME || 'NO_NAME';
const ENV = process.env.NODE_ENV || 'NO_ENV';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    Sprint0Module,
    LokiLoggerModule.forRoot({
      lokiUrl: `${LOKI_URL}:${LOKI_PORT}`,
      labels: {
        application: APPNAME,
        environment: ENV,
      },
      logToConsole: true,
    }),
    FidelityModule,
    BiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
