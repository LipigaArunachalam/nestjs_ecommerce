import { Controller, Get, Patch, Param, Body, ValidationPipe, Query, Post, UseGuards, } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { Product } from "src/schema/product.schema";
import { CreateProductDto, UpdateProductDto } from "./dto/seller.dto";
import { JwtAuthGuard } from "src/utility/guards/auth.guard";
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBearerAuth, ApiBody, } from "@nestjs/swagger";

@ApiTags("Sellers")
@ApiBearerAuth()
@Controller("sellers")
@UseGuards(JwtAuthGuard)

export class SellerController {
    constructor(private sellerService: SellerService) { }


    @Get(":sid/products")
    @ApiOperation({ summary: "Get all products of a seller" })
    @ApiParam({
        name: "sid",
        example: "fc4751cfe3b279c419615b9b00c1abb4",
        description: "Seller ID",
    })
    @ApiResponse({
        status: 200,
        description: "Seller products fetched successfully",
    })
    getAllProduct(@Param("sid") sid: string): Promise<Product[]> {
        return this.sellerService.getAllProduct(sid);
    }




    @Post(":sid/products")
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





    @Patch(":sid/products/delete")
    @ApiOperation({ summary: "Soft delete seller product" })
    @ApiParam({
        name: "sid",
        example: "acef497c1130f71ccfe63aaa1c9a607d",
        description: "seller ID",
    })
    @ApiParam({
        name: "pid",
        example: "beleza_saude",
        description: "Product ID",
    })
    @ApiResponse({
        status: 200,
        description: "Product deleted successfully",
    })
    deleteProduct(
        @Param("sid") sid: string,
        @Query("pid") pid?: string,
        @Query('product_name') pname?:string,
    ): Promise<string> {
        return this.sellerService.deleteProduct(sid, pid,pname);
    }




    @Patch(":sid/products/:pid")
    @ApiOperation({ summary: "Update seller product" })
    @ApiParam({
        name: "sid",
        example: "05a360982be454c7e715c0fec4f67243",
        description: "seller ID",
    })
    @ApiParam({
        name: "pid",
        example: "05a360982be454c7e715c0fec4f67243",
        description: "Product ID",
    })
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({
        status: 200,
        description: "Product updated successfully",
    })
    updateProduct(
        @Param("sid") sid: string,
        @Param("pid") pid: string,
        @Body(ValidationPipe) upd: UpdateProductDto,
    ): Promise<string> {
        return this.sellerService.updateProduct(sid, pid,upd);
    }



    @Get(":sid/prodcts/:name")
    @ApiOperation({ summary: "Search products by name" })
    @ApiParam({
        name: "sid",
        example: "94144541854e298c2d976cb893b81343",
        description: "Seller ID",
    })
    @ApiParam({
        name: "name",
        example: "iphone",
        description: "Product name",
    })
    @ApiResponse({
        status: 200,
        description: "Search results fetched successfully",
    })
    getSearch(@Param("sid") sid: string, @Param("name") name: string,): Promise<Product[]> {
        return this.sellerService.getSearch(sid,name);
    }
}