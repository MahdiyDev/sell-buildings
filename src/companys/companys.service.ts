import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branches } from 'src/branches/branches.entity';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompanysService {
    constructor(
        @InjectRepository(Company) 
        private companyRepository: Repository<Company>
    ) {}

    getCompany() {
        return this.companyRepository.find({ relations: [ 'company_ref_branch' ] })
    }

    async createCompany(company_name: string, company_info: string, company_ref_branch: Branches[]) {
        const foundCompany = await this.companyRepository.findOne({ company_name }, { relations: [ 'company_ref_branch' ] })
        
        if (!foundCompany) {
            const newCompany = this.companyRepository.create(
                { company_name, company_info, company_ref_branch }
            )
            this.companyRepository.save(newCompany)
            return "created"
        } else {            
            foundCompany.company_ref_branch = [...company_ref_branch, ...foundCompany.company_ref_branch]            
            this.companyRepository.save(foundCompany)
            return "updated"
        }
    }
}
