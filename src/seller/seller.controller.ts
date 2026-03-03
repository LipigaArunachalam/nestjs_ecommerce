// import { Controller, Get, Patch, Param,Body,ValidationPipe,Query , Post} from '@nestjs/common';
// import { SellerService } from './seller.service';
// import{ Product } from 'src/schema/product.schema';
// import{ CreateProductDto, UpdateProductDto } from './dto/seller.dto';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/utility/guards/auth.guard';

// @Controller('seller')
// @UseGuards(JwtAuthGuard)

// export class SellerController {
//     constructor(private sellerService : SellerService){}

//     @Get("all-product/:sid")
//     getAllProduct(@Param('sid') sid: string): Promise<Product[]>{
//        return this.sellerService.getAllProduct(sid);
//     }

//     @Post("add-product/:sid")
//     createProduct(@Body(ValidationPipe) product : CreateProductDto,@Param('sid') sid : string): Promise<string>{
//         return this.sellerService.createProduct(product, sid);
//     }

//     @Patch("del-product")
//     deleteProduct(@Query('product_id') pid? : string, 
//     @Query('product_category_name') pname? : string):Promise<string>{
//         return this.sellerService.deleteProduct(pid, pname);
//     }

//     @Patch("upd")
//     updateProduct(@Query('product_id') pid?: string, @Body(ValidationPipe) upd ?: UpdateProductDto):Promise<string>{
//         return this.sellerService.updateProduct(pid, upd);
//     }

//     @Get(":name")
//     getSearch(@Param('name') name: string): Promise<Product[]>{
//         return this.sellerService.getSearch(name);
//     }
// }


import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  ValidationPipe,
  Query,
  Post,
  UseGuards,
} from "@nestjs/common";
import { SellerService } from "./seller.service";
import { Product } from "src/schema/product.schema";
import { CreateProductDto, UpdateProductDto } from "./dto/seller.dto";
import { JwtAuthGuard } from "src/utility/guards/auth.guard";

import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Seller")
@ApiBearerAuth() 
@Controller("seller")
@UseGuards(JwtAuthGuard)
export class SellerController {
  constructor(private sellerService: SellerService) {}


  @Get("all-product/:sid")
  @ApiOperation({ summary: "Get all products of a seller" })
  @ApiParam({
    name: "sid",
    example: "SELL123",
    description: "Seller ID",
  })
  @ApiResponse({
    status: 200,
    description: "Seller products fetched successfully",
  })
  getAllProduct(@Param("sid") sid: string): Promise<Product[]> {
    return this.sellerService.getAllProduct(sid);
  }


  @Post("add-product/:sid")
  @ApiOperation({ summary: "Add product for seller" })
  @ApiParam({
    name: "sid",
    example: "94144541854e298c2d976cb893b81343",
    description: "Seller ID",
  })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: "Product added successfully",
  })
  createProduct(
    @Body(ValidationPipe) product: CreateProductDto,
    @Param("sid") sid: string,
  ): Promise<string> {
    return this.sellerService.createProduct(product, sid);
  }


  @Patch("del-product")
  @ApiOperation({ summary: "Soft delete seller product" })
  @ApiQuery({
    name: "product_id",
    required: false,
    example: "acef497c1130f71ccfe63aaa1c9a607d",
    description: "Product ID",
  })
  @ApiQuery({
    name: "product_category_name",
    required: false,
    example: "beleza_saude",
    description: "Product category",
  })
  @ApiResponse({
    status: 200,
    description: "Product deleted successfully",
  })
  deleteProduct(
    @Query("product_id") pid?: string,
    @Query("product_category_name") pname?: string,
  ): Promise<string> {
    return this.sellerService.deleteProduct(pid, pname);
  }


  @Patch("upd")
  @ApiOperation({ summary: "Update seller product" })
  @ApiQuery({
    name: "product_id",
    required: false,
    example: "05a360982be454c7e715c0fec4f67243",
    description: "Product ID to update",
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: "Product updated successfully",
  })
  updateProduct(
    @Query("product_id") pid?: string,
    @Body(ValidationPipe) upd?: UpdateProductDto,
  ): Promise<string> {
    return this.sellerService.updateProduct(pid, upd);
  }


  @Get(":name")
  @ApiOperation({ summary: "Search products by name" })
  @ApiParam({
    name: "name",
    example: "iphone",
    description: "Product name",
  })
  @ApiResponse({
    status: 200,
    description: "Search results fetched successfully",
  })
  getSearch(@Param("name") name: string): Promise<Product[]> {
    return this.sellerService.getSearch(name);
  }
}