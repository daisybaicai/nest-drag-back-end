import { Test, TestingModule } from '@nestjs/testing';
import { OrginzationController } from './orginzation.controller';

describe('Orginzation Controller', () => {
  let controller: OrginzationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrginzationController],
    }).compile();

    controller = module.get<OrginzationController>(OrginzationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
