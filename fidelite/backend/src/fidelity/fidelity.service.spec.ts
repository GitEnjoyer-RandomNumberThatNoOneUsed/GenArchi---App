import { Test, TestingModule } from '@nestjs/testing';
import { FidelityService } from './fidelity.service';

describe('FidelityService', () => {
  let service: FidelityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FidelityService],
    }).compile();

    service = module.get<FidelityService>(FidelityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
