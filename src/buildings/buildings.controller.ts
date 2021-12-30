import { Body, Controller, Get, Headers, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Buildings } from './building.entity';
import { BuildingsService } from './buildings.service';

@Controller('buildings')
export class BuildingsController {
    constructor(
        private readonly buildingService: BuildingsService
    ) {}

    @Get(':home')
    getBuildings(
        @Param('home') home: number
    ) {
        return this.buildingService.getBuilding(home)
    }

    @Post()
    @UseInterceptors(FilesInterceptor('file'))
    createBuilding(
        @Body() building: Buildings,
        @UploadedFiles() file: Express.Multer.File,
        @Headers('auth') auth: string
    ) {
        if (building && typeof file[0] !== "undefined") {
            return this.buildingService.createBuilding(building, file[0].filename, auth)
        } else {
            return { statusText: 'Bad Request' }
        }
    }
}
