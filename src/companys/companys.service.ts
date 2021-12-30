import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Branches } from 'src/branches/branches.entity';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompanysService {
    constructor(
        @InjectRepository(Company) 
        private companyRepository: Repository<Company>,
        private jwtService: JwtService
    ) {}

    getCompany() {
        return this.companyRepository.find({ relations: [ 'company_ref_branch' ] })
    }

    async createCompany(company_name: string, company_info: string, company_ref_branch: Branches[], filename: string, token: string) {
        const foundCompany = await this.companyRepository.findOne({ company_name }, { relations: [ 'company_ref_branch' ] })
        const access = await this.auth(token)
        if (!foundCompany && access.id) {
            const newCompany = this.companyRepository.create(
                { company_name, company_info, company_ref_branch, company_img: filename }
            )
            this.companyRepository.save(newCompany)
            return { statusText: 'created' }
        } else if (foundCompany && access.id) {            
            foundCompany.company_ref_branch = [...company_ref_branch, ...foundCompany.company_ref_branch]            
            this.companyRepository.save(foundCompany)
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
