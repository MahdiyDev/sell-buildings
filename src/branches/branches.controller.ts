import { Body, Controller, Get, Post } from '@nestjs/common';
import { Buildings } from 'src/buildings/building.entity';
import { Company } from 'src/companys/company.entity';
import { Branches } from './branches.entity';
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

    @Post()
    createBranches(
        @Body('branch_name') branch_name: string,
        @Body('branch_region') branch_region: string,
        @Body('buildings') buildings: Buildings[]
    ) {
        return this.branchesService.createBranches(branch_name, branch_region, buildings)      
    }
}
