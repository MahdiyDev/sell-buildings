import { Module } from '@nestjs/common';
import { CompanysModule } from './companys/companys.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { BranchesModule } from './branches/branches.module';
import { BuildingsModule } from './buildings/buildings.module';
import { BanksModule } from './banks/banks.module';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CartModule } from './cart/cart.module';
import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MulterModule.register({
      dest: './uploads/'
    }),
    CompanysModule,
    BranchesModule,
    BuildingsModule,
    BanksModule,
    AdminModule,
    CartModule,
    SellersModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
