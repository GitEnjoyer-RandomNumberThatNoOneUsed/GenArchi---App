import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Sprint0 } from '@prisma/client';
import { LokiLogger } from 'nestjs-loki-logger';

@Injectable()
export class Sprint0Service {
  private readonly lokiLogger = new LokiLogger('Sprint0Service');
  constructor(private prisma: PrismaService) {}

  async getAllSprint0(): Promise<Sprint0[]> {
    this.lokiLogger.debug('All sprint0 has been get');
    return this.prisma.sprint0.findMany();
  }

  async createSprint0(data: { text: string; appName: string }) {
    this.lokiLogger.debug('Sprint0 has been created');
    return this.prisma.sprint0.create({ data });
  }

  async updateSprint0(id: number, data: { text: string; appName: string }) {
    this.lokiLogger.debug('Sprint0 has been updated');
    return this.prisma.sprint0.update({ where: { id }, data });
  }

  async deleteSprint0(id: number) {
    this.lokiLogger.debug('Sprint0 has been deleted');
    return this.prisma.sprint0.delete({ where: { id } });
  }
}
