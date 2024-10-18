import { Controller, Get } from '@nestjs/common';
import { LokiLogger } from 'nestjs-loki-logger';
// import { createLog } from 'src/log/log';

@Controller('health')
export class HealthController {
  private readonly lokiLogger = new LokiLogger('HealthController');
  @Get()
  async health(): Promise<object> {
    // createLog('INFO', 'Health Fidelity Application is ok', {
    //   module: 'database',
    //   function: 'connect',
    //   user_id: 'X',
    // });
    this.lokiLogger.log('Health Fidelity Application is ok');
    return { status: 'ok' };
  }
}
