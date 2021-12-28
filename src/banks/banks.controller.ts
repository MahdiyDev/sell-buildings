import { Body, Controller, Get, Post } from '@nestjs/common';
import { Banks } from './banks.entity';
import { BanksService } from './banks.service';

@Controller('banks')
export class BanksController {
    constructor(
        private readonly bankService: BanksService
    ) {}

    @Get()
    getBanks() {
        return this.bankService.getBanks()
    }

    @Post()
    createBank(
        @Body() bank: Banks
    ) {
        return this.bankService.createBank(bank)
    }
}
