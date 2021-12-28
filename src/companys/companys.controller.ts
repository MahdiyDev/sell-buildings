import { Body, Controller, Get, Post } from '@nestjs/common';
import { Branches } from 'src/branches/branches.entity';
import { CompanysService } from './companys.service';

@Controller('companys')
export class CompanysController {
    constructor(
        private readonly companyService: CompanysService
    ) {}

    @Get()
    getCompany() {
        return this.companyService.getCompany()
    }

    @Post()
    createCompany(
        @Body('company_name') company_name: string,
        @Body('company_info') company_info: string,
        @Body('branches') branches: Branches[]
    ) {
        return this.companyService.createCompany(company_name, company_info, branches)
    }
}
