import { Body, Controller, Get, Headers, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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
    @UseInterceptors(FilesInterceptor('file'))
    createCompany(
        @Body('company_name') company_name: string,
        @Body('company_info') company_info: string,
        @Body('branches') branches: string,
        @UploadedFiles() file: Express.Multer.File,
        @Headers('auth') auth: string
    ) {
        return this.companyService.createCompany(company_name, company_info, branches ? JSON.parse(branches): null, file[0].filename, auth)
    }
}
