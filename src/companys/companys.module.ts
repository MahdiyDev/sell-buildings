import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanysController } from './companys.controller';
import { CompanysService } from './companys.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanysController],
  providers: [CompanysService]
})
export class CompanysModule {}
