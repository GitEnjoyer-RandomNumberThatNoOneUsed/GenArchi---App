import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FidelityService } from './fidelity.service';
import { Fidelity } from '@prisma/client';
import { LokiLogger } from 'nestjs-loki-logger';
import { PurchaseDto } from './dto/purchase.dto';

@Controller('fidelities')
export class FidelityController {
  private readonly lokiLogger = new LokiLogger('FidelityController');

  constructor(private readonly fidelityService: FidelityService) {}

  @Get()
  async getAllFidelity(): Promise<Fidelity[]> {
    this.lokiLogger.log('Fetching all fidelity records');
    return this.fidelityService.getAllFidelity();
  }

  @Get(':id')
  async getFidelityById(@Param('id') id: string): Promise<Fidelity> {
    return this.fidelityService.getFidelityById(Number(id));
  }

  @Post()
  async createFidelity(@Body() body: { credit?: number }): Promise<Fidelity> {
    if (body.credit) {
      // Simulate fidelity with credits
      const randomPastDate = new Date();
      randomPastDate.setMonth(
        randomPastDate.getMonth() - Math.floor(Math.random() * 12),
      ); // Random past date
      return this.fidelityService.createFidelity({
        credit: body.credit,
        dateCreation: randomPastDate,
      });
    } else {
      // Create new fidelity account with current date
      return this.fidelityService.createFidelity({
        credit: 0,
        dateCreation: new Date(),
      });
    }
  }

  @Put(':id')
  async updateCredit(
    @Body() body: { credit?: number }, // Only allow credit to be passed in the body
    @Param('id') id: string, // The id comes from the URL parameter
  ): Promise<Fidelity> {
    this.lokiLogger.log(`Updating fidelity record with id: ${id}`);
    this.lokiLogger.debug(`New value for credit: ${body.credit}`);

    // Pass only the credit field to the service layer
    return this.fidelityService.updateCredit(Number(id), {
      credit: body.credit,
    });
  }

  @Delete(':id')
  async deleteFidelity(@Param('id') id: string): Promise<Fidelity> {
    this.lokiLogger.log(`Deleting fidelity record with id: ${id}`);
    return this.fidelityService.deleteFidelity(Number(id));
  }

  @Post('purchase')
  async handlePurchase(@Body() purchaseDto: PurchaseDto): Promise<Fidelity> {
    this.lokiLogger.log(
      `Handling purchase for fidelity ID: ${purchaseDto.fidelityId}`,
    );
    return await this.fidelityService.processPurchase(purchaseDto);
  }
}
