import { Controller,Body,Get, Param,Query, Patch ,Post} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ParseIntPipe } from '@nestjs/common';
import { CreateSellerDto } from './admin.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';


@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

    @Get("all-seller")
    getAllSeller(): Promise<any[]>{
        return this.adminService.getAllSeller();
    }

    @Patch("del-seller/:id")
    deleteSeller(@Param('id') sid : string): Promise<string>{
        return this.adminService.deleteSeller(sid);
    }

    @Post("add-seller")
    addSeller(@Body() seller :CreateSellerDto ): Promise<string>{
        return this.adminService.addSeller(seller);
    }

    @Get("all-customer")
    gellAllCustomer(@Query('limit',ParseIntPipe) limit :number, @Query('offset', ParseIntPipe)offset:number): Promise<any[]>{
      return this.adminService.getAllCustomer(limit,offset);
    }

    @Get("count")
    getCount(): Promise<{city :string, count : number}[]>{
        return this.adminService.getCount();
    }

    @Get("search/:city")
    searchUser(@Param('city') city : string): Promise<any[]>{
        return this.adminService.searchUser(city);
    }
   
}
