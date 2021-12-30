import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sellers } from './sellers.entity';

@Injectable()
export class SellersService {
    constructor(
        @InjectRepository(Sellers)
        private sellerReposity: Repository<Sellers>,
        private jwtService: JwtService
    ) {}

    async register(seller: Sellers, auth: string) {        
        const access = await this.auth(auth)
        const foundSeller = await this.sellerReposity.findOne({ seller_email: seller.seller_email })        
        if (!foundSeller && access.id) {
            const newAdmin = this.sellerReposity.create(seller)
            await this.sellerReposity.save(newAdmin)
            return { message: 'created' }
        } else {
            return new BadRequestException()
        } 
    }

    async login(seller: Sellers) {
        const foundSeller = await this.sellerReposity.findOne({ seller_email: seller.seller_email }) 
        
        if (foundSeller) {
            const jwt = await this.jwtService.signAsync({ seller_email: foundSeller.seller_email })
            return { accessToken: 'Bearer ' + jwt }
        } else {
            return new NotFoundException()
        }      
    }

    async auth(token: string) {
        try {
            const accessToken = token.split(' ')[1]
            const foundSeller = await this.jwtService.verifyAsync(accessToken)        
            return foundSeller ? foundSeller : undefined
        } catch (error) {
            console.log(error);
        }
    }
}
