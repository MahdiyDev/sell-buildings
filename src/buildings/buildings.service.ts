import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buildings } from './building.entity';

@Injectable()
export class BuildingsService {
    constructor(
        @InjectRepository(Buildings)
        private buildingRepository: Repository<Buildings>,
        private jwtService: JwtService
    ) {}

    async getBuilding(home: number) {
        return await this.buildingRepository.find({ building_home_num: home })
    }

    async createBuilding(building: Buildings, filename: string, token: string) {
        const access = await this.auth(token)
        if (building && filename && access.id) {
            const newBuilding = this.buildingRepository.create({
                building_room_count: building.building_room_count,
                building_info: building.building_info,
                building_home_num: building.building_home_num,
                building_price: building.building_price,
                building_image: filename
            })
            await this.buildingRepository.save(newBuilding)
            return { statusText: 'Created' }
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
