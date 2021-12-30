import { Body, Controller, Headers, Post } from '@nestjs/common';
import { Sellers } from './sellers.entity';
import { SellersService } from './sellers.service';

@Controller('sellers')
export class SellersController {
    constructor(
        private readonly sellerService: SellersService
    ) {}

    @Post('register')
    register(
        @Body() seller: Sellers,
        @Headers('auth') auth: string
    ) {
        return this.sellerService.register(seller, auth)
    }

    @Post('login')
    login(
        @Body() seller: Sellers
    ) {
        return this.sellerService.login(seller)
    }
}
