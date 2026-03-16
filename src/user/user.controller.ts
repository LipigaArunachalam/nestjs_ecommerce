import { Controller, Param, Body, Get, ValidationPipe, Post, Patch, UseGuards, Req, Query, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/utility/guards/auth.guard';
import { Roles } from 'src/utility/decorators/role.decorator';
import { RolesGuard } from 'src/utility/guards/role.guard';
import { Role } from 'src/utility/enum/role.enum';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { BuyProductDto } from './dto/buyProduct.Dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Customer)
export class UserController {
    constructor(private userService: UserService) { }


    @Get(':uid/products')
    @ApiOperation({ summary: 'Get all products of a customer' })
    @ApiParam({
        name: 'uid',
        example: 'd3e7d37c0df9aef383f3f2a15b0dddfb',
        description: 'Customer ID',
    })
    @ApiResponse({
        status: 200,
        description: 'Customer products fetched successfully',
    })
    @ApiQuery({ name: 'limit', required: true, type: Number, description: 'Page number' })
    @ApiQuery({ name: 'page', required: true, type: Number, description: 'Page number' })
    getAllProduct(@Param('uid') uid: string, @Query('limit', ParseIntPipe) limit: number, @Query('page', ParseIntPipe) offset: number) {
        try {
            console.log(uid, offset, limit)
            return this.userService.getAllProduct(uid, limit, offset);
        } catch (err) {
            console.error(err.stack);
        }
    }



    @Get()
    @ApiOperation({ summary: 'Get user profile details' })
    @ApiResponse({
        status: 200,
        description: 'User details fetched successfully',
    })
    getDetails(@Req() req) {
        return this.userService.getDetails(req.user.user_id);
    }


    @Get("/products")
    @ApiOperation({ summary: 'Display all the products' })
    @ApiResponse({
        status: 200,
        description: 'All products displayed',
    })
    getProducts(@Query('limit', ParseIntPipe) limit: number, @Query('page', ParseIntPipe) offset: number) {
        return this.userService.getProducts(limit, offset);
    }



    @Post('buy')
    @ApiOperation({ summary: "Buy product" })
    @ApiBody({ type: BuyProductDto })
    @ApiResponse({
        status: 200,
        description: "Product bought successfully ",
    })
    buyProduct(@Body() buyProductDto: BuyProductDto) {
        return this.userService.buyProduct(buyProductDto);
    }



    @Post(":uid/cart/:pid")
    @ApiOperation({ summary: 'Products added to cart' })
    @ApiResponse({
        status: 200,
        description: 'Product added to cart',
    })
    @ApiParam({
        name: 'uid',
        example: 'd3e7d37c0df9aef383f3f2a15b0dddfb',
        description: 'Customer ID',
    })
    @ApiParam({
        name: 'pid',
        example: '7bb6f29c2be57716194f96496660c7c2',
        description: 'Product ID',
    })
    addToCart(@Param("uid") uid: string, @Param("pid") pid: string) {
        return this.userService.addToCart(uid, pid);
    }


    @Get("/cart")
    @ApiOperation({ summary: 'fetching cart items' })
    @ApiResponse({
        status: 200,
        description: 'User cartitems fetched successfully',
    })
    cart(@Req() req) {
        return this.userService.cart(req.user.user_id);
    }

    @Patch(":uid/cart/:pid")
    @ApiOperation({ summary: 'Removing product from cart' })
    @ApiResponse({
        status: 200,
        description: 'Product removed from cart',
    })
    @ApiParam({
        name: 'uid',
        example: 'd3e7d37c0df9aef383f3f2a15b0dddfb',
        description: 'Customer ID',
    })
    @ApiParam({
        name: 'pid',
        example: '7bb6f29c2be57716194f96496660c7c2',
        description: 'Product ID',
    })
    remove(@Param("uid") uid: string, @Param("pid") pid: string) {
        return this.userService.remove(uid, pid);
    }



    @Get("dashboard")
    @ApiOperation({ summary: "Customer dashboard" })
    @ApiResponse({
        status: 200,
        description: "Customer dashboard loaded",
    })
    userDashboard(@Req() res): Promise<any> {
        return this.userService.userDashboard(res.user.user_id);
    }

     @Get("catalog/:prod")
    @ApiOperation({ summary: "Catalog for user" })
    @ApiResponse({
        status: 200,
        description: "Products loaded",
    })
    searchProduct(@Param("prod") prod : string, @Query("limit") limit:number, @Query("page") offset:number): Promise<any> {
        return this.userService.searchProduct( prod, limit, offset);
    }

    @Get("all-category")
    @ApiOperation({ summary: "Get all categories"})
    @ApiResponse({
        status: 200,
        description: "categories loaded",
    })
    getAllCategory(){
        return this.userService.getAllCategory();
    }

    @Get("category/:name")
    @ApiOperation({ summary: "Cataegory for user" })
    @ApiParam({
        name: 'name',
        example: 'furniture',
        description: "Product category"
    })
    @ApiResponse({
        status: 200,
        description: "Products loaded",
    })
    getCategory(@Param('name') category: string,
                @Query('limit') limit: number,
                @Query('page') page: number){
        return this.userService.getCategory( category, limit, page);
    }

    

}
