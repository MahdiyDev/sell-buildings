import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branches } from './branches.entity';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/admin/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Branches]),
    MulterModule.register({
      dest: './uploads/'
    }),
    JwtModule.register({
      secret: jwtConstants.secret
    })
  ],
  providers: [BranchesService],
  controllers: [BranchesController]
})
export class BranchesModule {}
