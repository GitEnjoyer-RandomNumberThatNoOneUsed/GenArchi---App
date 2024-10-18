import { Module } from '@nestjs/common';
import { Sprint0Controller } from './sprint0.controller';
import { Sprint0Service } from './sprint0.service';

@Module({
  controllers: [Sprint0Controller],
  providers: [Sprint0Service],
})
export class Sprint0Module {}
