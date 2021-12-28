import { Body, Controller, Get, Post } from '@nestjs/common';
import { Buildings } from './building.entity';
import { BuildingsService } from './buildings.service';

@Controller('buildings')
export class BuildingsController {
    constructor(
        private readonly buildingService: BuildingsService
    ) {}

    @Get()
    getBuildings() {
        return this.buildingService.getBuilding()
    }

    @Post()
    createBuilding(
        @Body() building: Buildings
    ) {
        return this.buildingService.createBuilding(building)
    }
}
