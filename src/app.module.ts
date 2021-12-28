import { Module } from '@nestjs/common';
import { CompanysModule } from './companys/companys.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { BranchesModule } from './branches/branches.module';
import { BuildingsModule } from './buildings/buildings.module';
import { BanksModule } from './banks/banks.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CompanysModule,
    BranchesModule,
    BuildingsModule,
    BanksModule,
    AdminModule
  ]
})
export class AppModule {}
