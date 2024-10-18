import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Fidelity } from '@prisma/client';
import { LokiLogger } from 'nestjs-loki-logger';
import { PurchaseDto } from './dto/purchase.dto';

@Injectable()
export class FidelityService {
  private readonly lokiLogger = new LokiLogger('FidelityService');

  constructor(private readonly prisma: PrismaService) {}

  async getAllFidelity(): Promise<Fidelity[]> {
    this.lokiLogger.debug('All fidelity records have been retrieved');
    return this.prisma.fidelity.findMany();
  }

  async getFidelityById(id: number): Promise<Fidelity> {
    this.lokiLogger.debug(`Fidelity record with id ${id} has been retrieved`);
    return this.prisma.fidelity.findUnique({ where: { id } });
  }

  async createFidelity(data: {
    credit?: number;
    dateCreation?: Date;
  }): Promise<Fidelity> {
    this.lokiLogger.debug('Fidelity record has been created');
    return this.prisma.fidelity.create({ data });
  }

  async updateCredit(
    id: number,
    data: { credit?: number }, // Only allow the credit to be updated
  ): Promise<Fidelity> {
    this.lokiLogger.debug(
      `Fidelity record with id ${id} is being updated with credit: ${data.credit}`,
    );

    return this.prisma.fidelity.update({
      where: { id }, // The id is used to find the record but not modified
      data: {
        credit: data.credit, // Only update the credit field
      },
    });
  }

  async deleteFidelity(id: number): Promise<Fidelity> {
    this.lokiLogger.debug(`Fidelity record with id ${id} has been deleted`);
    return this.prisma.fidelity.delete({ where: { id } });
  }

  async processPurchase(purchaseDto: PurchaseDto): Promise<Fidelity> {
    this.lokiLogger.log(
      `Processing purchase for fidelity ID: ${purchaseDto.fidelityId}`,
    );
    const fidelity = await this.prisma.fidelity.findUnique({
      where: { id: purchaseDto.fidelityId },
    });

    if (!fidelity) {
      throw new Error('Fidelity account not found');
    }

    // Calculate the new credit after the purchase
    const nbPointsDebited = purchaseDto.purchase;

    const newCredit =
      fidelity.credit - nbPointsDebited + purchaseDto.purchase * 0.1;
    if (newCredit < 0) {
      throw new Error('Not enough fidelity points');
    }

    // Update the fidelity account with the new credit after purchase
    await this.prisma.fidelity.update({
      where: { id: purchaseDto.fidelityId },
      data: {
        credit: newCredit,
      },
    });

    this.lokiLogger.log(
      `Fidelity account updated for ID ${purchaseDto.fidelityId}: New credit = ${newCredit}`,
    );

    //return the updated fidelity account
    return this.prisma.fidelity.findUnique({
      where: { id: purchaseDto.fidelityId },
    });
  }
}
