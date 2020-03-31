import { Test, TestingModule } from '@nestjs/testing';
import { OrginzationService } from './orginzation.service';

describe('OrginzationService', () => {
  let service: OrginzationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrginzationService],
    }).compile();

    service = module.get<OrginzationService>(OrginzationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
