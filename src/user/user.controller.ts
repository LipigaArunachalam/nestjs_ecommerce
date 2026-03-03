// import { Controller, Param, Body, Get, ValidationPipe,Post } from '@nestjs/common';
// import { UserService } from './user.service';


// @Controller('user')
// export class UserController {

//     constructor(private userService : UserService){}

//         @Get("all-product/:sid")
//         getAllProduct(@Param('sid') sid: string){
//            return this.userService.getAllProduct(sid);
//         }

//        @Get("details/:uid")
//        getDetails(@Param('uid') uid : string){
//         return this.userService.getDetails(uid);
//        }  
// }


import {
    Controller,
    Param,
    Body,
    Get,
    ValidationPipe,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';

import {
    ApiTags,
    ApiOperation,
    ApiParam,
    ApiResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }


    @Get('all-product/:uid')
    @ApiOperation({ summary: 'Get all products of a customer' })
    @ApiParam({
        name: 'uid',
        example: '69a652005b0209eb227b41aa',
        description: 'Customer ID',
    })
    @ApiResponse({
        status: 200,
        description: 'Customer products fetched successfully',
    })
    getAllProduct(@Param('uid') uid: string) {
        return this.userService.getAllProduct(uid);
    }


    @Get('details/:uid')
    @ApiOperation({ summary: 'Get user profile details' })
    @ApiParam({
        name: 'uid',
        example: '69a652005b0209eb227b41aa',
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