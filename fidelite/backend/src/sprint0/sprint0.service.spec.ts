import { Test, TestingModule } from '@nestjs/testing';
import { Sprint0Service } from './sprint0.service';

describe('Sprint0Service', () => {
  let service: Sprint0Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Sprint0Service],
    }).compile();

    service = module.get<Sprint0Service>(Sprint0Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
