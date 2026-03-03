import { Controller, Param, Body, Get, ValidationPipe,Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/utility/guards/auth.guard';
import { Roles } from 'src/utility/decorators/role.decorator';
import { RolesGuard } from 'src/utility/guards/role.guard';
import { Role } from 'src/utility/enum/role.enum';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Customer) 
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
