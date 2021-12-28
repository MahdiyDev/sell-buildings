import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banks } from './banks.entity';

@Injectable()
export class BanksService {
    constructor(
        @InjectRepository(Banks)
        private bankRepository: Repository<Banks>
    ) {}

    getBanks() {
        return this.bankRepository.find()
    }

    createBank(bank: Banks) {
        const newBank = this.bankRepository.create(bank)
        return this.bankRepository.save(newBank)
    }
}
