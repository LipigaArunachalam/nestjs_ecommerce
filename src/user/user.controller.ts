import { Controller, Param, Body, Get, ValidationPipe,Post } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    constructor(private userService : UserService){}
    
        @Get("all-product/:sid")
        getAllProduct(@Param('sid') sid: string){
           return this.userService.getAllProduct(sid);
        }
    
       @Get("details/:uid")
       getDetails(@Param('uid') uid : string){
        return this.userService.getDetails(uid);
       }  
}
