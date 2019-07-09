import { Types } from 'mongoose';
import { Controller, Get, Param, Query, Body, Post, Put, UseGuards } from '@nestjs/common';

import { Acc } from '@shared/decorator/account.decorator';
import { Account } from 'auth/jwt.interface';

import { ProductDTO } from './dto/product.dto';

import { ProductsService } from '../core/products.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {

    constructor(
        private readonly productService: ProductsService
    ) { }

    @Get(':id')
    async getProduct(@Param('id') id: Types.ObjectId) {
        const product = await this.productService.get(id);
        return product;
    }

    @Get()
    async listProducts(@Query('q') query) {
        const list = await this.productService.list(query);
        return list;
    }

    @Post()
    @UseGuards(AuthGuard())
    async registerProduct(@Body() payload: ProductDTO, @Acc() acc: Account) {
        const Product = await this.productService.save(payload, acc);
        return Product;
    }

    @Put(':id')
    async updateProduct(@Param('id') id: Types.ObjectId, @Body() payload: ProductDTO) {
        const Product = await this.productService.update(id, payload);
        return Product;
    }
}
