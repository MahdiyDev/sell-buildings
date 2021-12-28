import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminReposity: Repository<Admin>,
        private jwtService: JwtService
    ) {}

    async register(admin: Admin, auth: string) {
        const access = await this.auth(auth)
        const foundAdmin = await this.adminReposity.findOne({ admin_email: admin.admin_email })
        
        if (!foundAdmin && access) {
            const newAdmin = this.adminReposity.create(admin)
            const jwt = await this.jwtService.signAsync({ id: newAdmin.admin_uid })
            await this.adminReposity.save(newAdmin)
            return { accessToken: 'Bearer ' + jwt }
        } else {
            return new BadRequestException()
        } 
    }

    async login(admin: Admin) {
        const foundAdmin = await this.adminReposity.findOne(admin)

        if (foundAdmin) {
            const jwt = await this.jwtService.signAsync({ id: foundAdmin.admin_uid })
            return { accessToken: 'Bearer ' + jwt }
        } else {
            return new NotFoundException()
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
