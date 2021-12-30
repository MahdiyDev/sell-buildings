import { Body, Controller, Get, Headers, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BranchesService } from './branches.service';

@Controller('branches')
export class BranchesController {
    constructor(
        private readonly branchesService: BranchesService
    ) {}

    @Get()
    getBranches() {
        return this.branchesService.getBranches()
    }

    @Get(':id')
    getSigleBranches(
        @Param('id') id: string
    ) {
        return this.branchesService.getSigleBranches(id)
    }

    @Post()
    @UseInterceptors(FilesInterceptor('file'))
    createBranches(
        @Body('branch_name') branch_name: string,
        @Body('branch_region') branch_region: string,
        @Body('buildings') buildings : string,
        @UploadedFiles() file: Express.Multer.File,
        @Headers('auth') auth: string
    ) {
        return this.branchesService.createBranches(branch_name, branch_region, JSON.parse(buildings), file[0].filename, auth)
    }
}
