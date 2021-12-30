import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/admin/constants';
import { Buildings } from './building.entity';
import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Buildings]),
    MulterModule.register({
      dest: './uploads/'
    }),
    JwtModule.register({
      secret: jwtConstants.secret
    })
  ],
  controllers: [BuildingsController],
  providers: [BuildingsService]
})
export class BuildingsModule {}
