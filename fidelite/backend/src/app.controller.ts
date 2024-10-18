import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { createLog } from './log/log';
import { LokiLogger } from 'nestjs-loki-logger';

@Controller()
export class AppController {
  private readonly lokiLogger = new LokiLogger('AppController');

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // createLog('INFO', 'Fidelity Application says Hello', {
    //   module: 'database',
    //   function: 'connect',
    //   user_id: 'X',
    // });
    this.lokiLogger.log('Fidelity Application says Hello');
    return this.appService.getHello();
  }
}
