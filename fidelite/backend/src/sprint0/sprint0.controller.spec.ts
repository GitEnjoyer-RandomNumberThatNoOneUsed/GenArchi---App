import { Test, TestingModule } from '@nestjs/testing';
import { Sprint0Controller } from './sprint0.controller';

describe('Sprint0Controller', () => {
  let controller: Sprint0Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Sprint0Controller],
    }).compile();

    controller = module.get<Sprint0Controller>(Sprint0Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
