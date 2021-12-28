import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Buildings } from 'src/buildings/building.entity';
import { Repository } from 'typeorm';
import { Branches } from './branches.entity';

@Injectable()
export class BranchesService {
    constructor(
        @InjectRepository(Branches)
        private branchesRepository: Repository<Branches>
    ) {}

    async getBranches() {
        return await this.branchesRepository.find({ relations: [ 'branch_ref_building' ] })
    }

    async createBranches(branch_name: string, branch_region: string, branch_ref_building: Buildings[]) {
        const foundBranch = await this.branchesRepository.findOne({ branch_name }, { relations: [ 'branch_ref_building' ] })
        if (!foundBranch) {
            const newBranches = this.branchesRepository.create({ branch_name, branch_region, branch_ref_building })
            await this.branchesRepository.save(newBranches)
            return 'created'
        } else {
            foundBranch.branch_ref_building = [ ...branch_ref_building, ...foundBranch.branch_ref_building ]
            await this.branchesRepository.save(foundBranch)
            return 'updated'
        }
    }
}
