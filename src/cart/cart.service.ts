import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banks } from 'src/banks/banks.entity';
import { Branches } from 'src/branches/branches.entity';
import { Buildings } from 'src/buildings/building.entity';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
    ) {}

    // Get
    getCarts(): Promise<Cart[]> {
        return this.cartRepository.find({ relations: [ 'cart_ref_building', 'cart_branch', 'cart_bank' ] })
    }

    // Post
    async createCart(cart_ref_building: Buildings[], cart_branch: Branches, cart_email: string, cart_bank: Banks) {
        const foundCart = await this.cartRepository.findOne({ cart_email }, { relations: [ 'cart_ref_building', 'cart_branch' ] })
        
        if (!foundCart) {
            const newCart = this.cartRepository.create(
                { cart_email, cart_branch, cart_ref_building, cart_bank }
            )            
            await this.cartRepository.save(newCart)
            return { statusText: 'Created' }
        } else {
            foundCart.cart_ref_building = [ ...cart_ref_building, ...foundCart.cart_ref_building ]
            await this.cartRepository.save(foundCart)
            return { statusText: 'updated' }
        }
    }
}
