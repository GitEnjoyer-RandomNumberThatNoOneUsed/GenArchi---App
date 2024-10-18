import { Controller, Get } from '@nestjs/common';
import { LokiLogger } from 'nestjs-loki-logger';
import { BiService } from './bi.service';

@Controller('bi')
export class BiController {
  private readonly lokiLogger = new LokiLogger('BiController');
  constructor(private readonly biService: BiService) {}

  @Get()
  async getAllFidelity() {
    this.lokiLogger.log('Fetching all fidelity records');
    return this.biService.getAllFidelity();
  }
}
