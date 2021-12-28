import { Test, TestingModule } from '@nestjs/testing';
import { BuildingsService } from './buildings.service';

describe('BuildingsService', () => {
  let service: BuildingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingsService],
    }).compile();

    service = module.get<BuildingsService>(BuildingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
