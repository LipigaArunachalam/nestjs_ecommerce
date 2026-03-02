import { Controller , Get, Post, Body, Param, ValidationPipe, Query, Patch} from '@nestjs/common';
import { ProductService } from './product.service';
import {Product} from './../schema/product.schema';
import { CreateProductDto } from './product.dto';
import { UpdateProductDto } from './updproduct.dto';

@Controller('product')
export class ProductController {
    constructor(private productService : ProductService){}
    @Get("all-product")
    getAllProduct(): Promise<Product[]>{
       return this.productService.getAllProduct();
    }

    @Post("add-product")
    createProduct(@Body(ValidationPipe) product : CreateProductDto){
        return this.productService.createProduct(product);
    }

    @Patch("del-product")
    deleteProduct(@Query('product_id') pid? : string, 
    @Query('product_category_name') pname? : string):Promise<string>{
        return this.productService.deleteProduct(pid, pname);
    }

    @Patch("upd")
    updateProduct(@Query('product_id') pid?: string, @Body(ValidationPipe) upd ?: UpdateProductDto):Promise<string>{
        return this.productService.updateProduct(pid, upd);
    }

    @Get(":name")
    getSearch(@Param('name') name: string): Promise<Product[]>{
        return this.productService.getSearch(name);
    }

}
