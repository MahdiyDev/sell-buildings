import { Module } from '@nestjs/common';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banks } from './banks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Banks])],
  providers: [BanksService],
  controllers: [BanksController]
})
export class BanksModule {}
