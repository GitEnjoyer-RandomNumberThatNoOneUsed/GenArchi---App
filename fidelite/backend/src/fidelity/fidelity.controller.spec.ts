import { Test, TestingModule } from '@nestjs/testing';
import { FidelityController } from './fidelity.controller';

describe('FidelityController', () => {
  let controller: FidelityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FidelityController],
    }).compile();

    controller = module.get<FidelityController>(FidelityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
