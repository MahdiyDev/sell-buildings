import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banks } from './banks.entity';

@Injectable()
export class BanksService {
    constructor(
        @InjectRepository(Banks)
        private bankRepository: Repository<Banks>,
        private jwtService: JwtService
    ) {}

    async getBanks(num: number) {
        try {
            let arr = []
            const banks = await this.bankRepository.find()
            banks.forEach(b => {
                if (b.bank_credit_num >= num) {
                    arr.push(b)
                }
            })
            return arr
        } catch (error) {
            console.log(error);
        }
    }

    async createBank(bank: Banks, filename: string, token: string) {  
        const access = await this.auth(token)        
          
        if (bank && filename && access.id) {
            const newBank = this.bankRepository.create(
                { bank_img: filename, bank_name: bank.bank_name, bank_credit_num: bank.bank_credit_num }
            )
            this.bankRepository.save(newBank)
            return { statusText: 'created' }
        } else {
            return { statusText: 'Bad Request' }
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
