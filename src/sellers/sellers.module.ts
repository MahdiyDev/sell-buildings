import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { Sellers } from './sellers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/admin/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sellers]),
    JwtModule.register({
      secret: jwtConstants.secret
    })
  ],
  providers: [SellersService],
  controllers: [SellersController]
})
export class SellersModule {}
