import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branches } from './branches.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branches])],
  providers: [BranchesService],
  controllers: [BranchesController]
})
export class BranchesModule {}
