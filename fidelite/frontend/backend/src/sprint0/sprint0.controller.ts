import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Sprint0Service } from './sprint0.service';
import { Sprint0 } from '@prisma/client';
// import { createLog } from 'src/log/log';
import { LokiLogger } from 'nestjs-loki-logger';

@Controller('sprint0')
export class Sprint0Controller {
  // Logger intialization
  private readonly lokiLogger = new LokiLogger('Sprint0Controller');

  constructor(private readonly sprint0Service: Sprint0Service) {}

  @Get()
  async getAllSprint0(): Promise<Sprint0[]> {
    // Logging basic information
    this.lokiLogger.log('Fetching all sprint0 data');
    // createLog('INFO', 'Fidelity Application, get all sprint0', {
    //   module: 'database',
    //   function: 'connect',
    //   user_id: 'X',
    // });
    return this.sprint0Service.getAllSprint0();
  }

  @Post()
  async createSprint0(
    @Body() body: { text: string; appName: string },
  ): Promise<Sprint0> {
    this.lokiLogger.log('Creating a new sprint0');
    this.lokiLogger.debug(
      `Creating sprint0 with text: ${body.text}, appName: ${body.appName}`,
    );
    // createLog('INFO', 'Fidelity Application, create sprint0', {
    //   module: 'database',
    //   function: 'connect',
    //   user_id: 'X',
    // });
    return this.sprint0Service.createSprint0(body);
  }

  @Put(':id')
  async updateSprint0(
    @Body() body: { text: string; appName: string },
    @Param('id') id: string,
  ): Promise<Sprint0> {
    this.lokiLogger.log(`Updating sprint0 with id: ${id}`);
    this.lokiLogger.debug(
      `New values for text: ${body.text}, appName: ${body.appName}`,
    );
    // createLog('INFO', 'Fidelity Application, update a sprint0', {
    //   module: `${body.text} and ${body.appName}`,
    //   function: 'connect',
    //   user_id: id,
    // });
    return this.sprint0Service.updateSprint0(Number(id), body);
  }

  @Delete(':id')
  async deleteSprint0(@Param('id') id: string): Promise<Sprint0> {
    this.lokiLogger.log(`Deleting sprint0 with id: ${id}`);
    // createLog('INFO', 'Fidelity Application, delete a sprint0', {
    //   module: 'database',
    //   function: 'connect',
    //   user_id: id,
    // });
    return this.sprint0Service.deleteSprint0(Number(id));
  }

  @Get('infos')
  getVerson(): { commitSha: string; environment: string } {
    this.lokiLogger.log('Fetching application version info');
    return {
      commitSha: process.env.COMMIT_SHA || 'Not available',
      environment: process.env.NODE_ENV || 'Not available',
    };
  }
}
