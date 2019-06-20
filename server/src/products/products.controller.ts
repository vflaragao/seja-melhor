import { Types } from 'mongoose';
import { Controller, Get, Param, Query, Body, Post, Put } from '@nestjs/common';

import { ProductDTO } from './dto/product.dto';
import { ProductsService } from './products.service';

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
    async registerProduct(@Body() payload: ProductDTO) {
        const Product = await this.productService.save(payload);
        return Product;
    }

    @Put(':id')
    async updateProduct(@Param('id') id: Types.ObjectId, @Body() payload: ProductDTO) {
        const Product = await this.productService.update(id, payload);
        return Product;
    }
}
