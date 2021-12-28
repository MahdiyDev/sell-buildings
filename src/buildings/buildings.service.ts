import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buildings } from './building.entity';

@Injectable()
export class BuildingsService {
    constructor(
        @InjectRepository(Buildings)
        private buildingRepository: Repository<Buildings>
    ) {}

    async getBuilding() {
        return await this.buildingRepository.find()
    }

    async createBuilding(building: Buildings) {
        const newBuilding = await this.buildingRepository.create(building)
        return this.buildingRepository.save(newBuilding)
    }
}
