import { Module } from '@nestjs/common';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banks } from './banks.entity';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/admin/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Banks]),
    MulterModule.register({
      dest: './uploads/'
    }),
    JwtModule.register({
      secret: jwtConstants.secret
    })
  ],
  providers: [BanksService],
  controllers: [BanksController]
})
export class BanksModule {}
