import { Controller, Param, Body, Get, ValidationPipe,Post, UseGuards, Req,Query, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/utility/guards/auth.guard';
import { Roles } from 'src/utility/decorators/role.decorator';
import { RolesGuard } from 'src/utility/guards/role.guard';
import { Role } from 'src/utility/enum/role.enum';
import { ApiTags, ApiOperation, ApiParam, ApiResponse,ApiQuery } from '@nestjs/swagger';


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
    getAllProduct(@Param('uid') uid: string,@Query('limit',ParseIntPipe) limit:number,@Query('page',ParseIntPipe) offset:number) {
        return this.userService.getAllProduct(uid, limit,offset);
    }



    @Get()
    @ApiOperation({ summary: 'Get user profile details' })
    @ApiResponse({
        status: 200,
        description: 'User details fetched successfully',
    })
    getDetails(@Req() req){
        return this.userService.getDetails(req.user.user_id);
    }


    
    @Get("/products")
    @ApiOperation({ summary: 'Display all the products' })
    @ApiResponse({
        status: 200,
        description: 'All products displayed',
    })
    getProducts(@Query('limit', ParseIntPipe) limit : number, @Query('page', ParseIntPipe) offset : number){
        return this.userService.getProducts(limit, offset);
    }
}
