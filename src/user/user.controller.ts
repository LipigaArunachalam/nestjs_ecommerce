import { Controller, Param, Body, Get, ValidationPipe,Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/utility/guards/auth.guard';
import { Roles } from 'src/utility/decorators/role.decorator';
import { RolesGuard } from 'src/utility/guards/role.guard';
import { Role } from 'src/utility/enum/role.enum';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, } from '@nestjs/swagger';


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
    getAllProduct(@Param('uid') uid: string) {
        return this.userService.getAllProduct(uid);
    }


    @Get(':uid')
    @ApiOperation({ summary: 'Get user profile details' })
    @ApiParam({
        name: 'uid',
        example: '4f21938f7b925dd621343fc205395145',
        description: 'User ID',
    })
    @ApiResponse({
        status: 200,
        description: 'User details fetched successfully',
    })
    getDetails(@Param('uid') uid: string) {
        return this.userService.getDetails(uid);
    }
}
