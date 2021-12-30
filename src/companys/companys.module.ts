import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/admin/constants';
import { Company } from './company.entity';
import { CompanysController } from './companys.controller';
import { CompanysService } from './companys.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    MulterModule.register({
      dest: "./uploads/"
    }),
    JwtModule.register({
      secret: jwtConstants.secret
    })
  ],
  controllers: [CompanysController],
  providers: [CompanysService]
})
export class CompanysModule {}
