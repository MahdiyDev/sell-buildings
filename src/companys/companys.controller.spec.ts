import { Test, TestingModule } from '@nestjs/testing';
import { CompanysController } from './companys.controller';

describe('CompanysController', () => {
  let controller: CompanysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanysController],
    }).compile();

    controller = module.get<CompanysController>(CompanysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
