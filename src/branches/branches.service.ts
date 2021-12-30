import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Buildings } from 'src/buildings/building.entity';
import { Repository } from 'typeorm';
import { Branches } from './branches.entity';

@Injectable()
export class BranchesService {
    constructor(
        @InjectRepository(Branches)
        private branchesRepository: Repository<Branches>,
        private jwtService: JwtService
    ) {}

    async getBranches() {
        return await this.branchesRepository.find({ relations: [ 'branch_ref_building' ] })
    }

    async getSigleBranches(id: string) {
        if (id) {
            return await this.branchesRepository.findOne(id, { relations: [ 'branch_ref_building' ] })
        } else {
            return { message: "Not Found" }
        }
    }

    async createBranches(branch_name: string, branch_region: string, branch_ref_building: Buildings[], filename: string, token: string) {
        const foundBranch = await this.branchesRepository.findOne({ branch_region }, { relations: [ 'branch_ref_building' ] })
        const access = await this.auth(token)
        if (!foundBranch && access.id) {
            const newBranches = this.branchesRepository.create({ branch_name, branch_region, branch_ref_building, branch_img: filename })
            await this.branchesRepository.save(newBranches)
            return { statusText: 'created' }
        } else if (foundBranch && access.id) {
            foundBranch.branch_ref_building = [ ...branch_ref_building, ...foundBranch.branch_ref_building ]
            await this.branchesRepository.save(foundBranch)
            return { statusText: 'updated' }
        } else {
            return { statusText: 'Not Allowed' }
        }
    }

    async auth(token: string) {
        try {
            const accessToken = token.split(' ')[1]
            const foundAdmin = await this.jwtService.verifyAsync(accessToken)        
            return foundAdmin ? foundAdmin : undefined
        } catch (error) {
            console.log(error);
        }
    }
}
