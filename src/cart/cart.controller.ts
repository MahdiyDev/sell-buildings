import { Body, Controller, Get, Post } from '@nestjs/common';
import { Banks } from 'src/banks/banks.entity';
import { Branches } from 'src/branches/branches.entity';
import { Buildings } from 'src/buildings/building.entity';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartsService: CartService) {}

    @Get()
    getCatrs() {
        return this.cartsService.getCarts()
    }

    @Post()
    createCart(
        @Body('cart_email') cart_email: string,
        @Body('buildings') cart_buildings: Buildings[],
        @Body('branch') cart_branch: Branches,
        @Body('cart_bank') cart_bank: Banks
    ) {        
        return this.cartsService.createCart(cart_buildings, cart_branch, cart_email, cart_bank)      
    }
}
