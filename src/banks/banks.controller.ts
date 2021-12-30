import { Body, Controller, Get, Headers, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Banks } from './banks.entity';
import { BanksService } from './banks.service';

@Controller('banks')
export class BanksController {
    constructor(
        private readonly bankService: BanksService
    ) {}

    @Get(':num')
    getBanks(
        @Param('num') num: number
    ) {
        return this.bankService.getBanks(num)
    }

    @Post()
    @UseInterceptors(FilesInterceptor('file'))
    createBank(
        @Body() bank: Banks,
        @UploadedFiles() file: Express.Multer.File,
        @Headers('auth') auth: string
    ) {
        return this.bankService.createBank(bank, file[0].filename, auth)
    }
}
