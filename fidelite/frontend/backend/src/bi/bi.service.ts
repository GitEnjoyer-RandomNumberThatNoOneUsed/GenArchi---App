import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';

import { LokiLogger } from 'nestjs-loki-logger';

@Injectable()
export class BiService implements OnModuleInit {
  private readonly logger = new LokiLogger('BiService');
  constructor(
    private prisma: PrismaService,
    @Inject('BI_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  onModuleInit() {
    this.getAllFidelity();
  }

  async getAllFidelity() {
    const fidelityBI = (await this.prisma.fidelity.findMany()).map(
      ({ id, credit, dateCreation }) => ({
        id,
        credit,
        dateCreation,
      }),
    );
    this.rabbitClient.emit('fidelity_BI', fidelityBI);
    this.logger.log('Fetching all clients');
    return fidelityBI;
  }
}
