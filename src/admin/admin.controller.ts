import { Controller, Body, Get, Param, Query, Patch, Post, UseGuards, ParseIntPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateSellerDto } from "./dto/admin.dto";
import { JwtAuthGuard } from "src/utility/guards/auth.guard";
import { RolesGuard } from "src/utility/guards/role.guard";
import { Roles } from "src/utility/decorators/role.decorator";
import { Role } from "src/utility/enum/role.enum";
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBearerAuth, } from "@nestjs/swagger";



@ApiTags("Admin")
@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminController {
    constructor(private readonly adminService: AdminService) { }


    @Get("all-seller")
    @ApiOperation({ summary: "Get all sellers" })
    @ApiResponse({
        status: 200,
        description: "List of sellers fetched successfully",
    })
    getAllSeller(): Promise<any[]> {
        return this.adminService.getAllSeller();
    }


    @Patch("del-seller/:id")
    @ApiOperation({ summary: "Soft delete a seller" })
    @ApiParam({
        name: "id",
        example: "69943c3ea47648ff8b80b112",
        description: "Seller ID",
    })
    @ApiResponse({
        status: 200,
        description: "Seller deleted successfully",
    })
    deleteSeller(@Param("id") sid: string): Promise<string> {
        return this.adminService.deleteSeller(sid);
    }


    @Post("add-seller")
    @ApiOperation({ summary: "Create a new seller" })
    @ApiResponse({
        status: 201,
        description: "Seller created successfully",
    })
    addSeller(@Body() seller: CreateSellerDto): Promise<string> {
        return this.adminService.addSeller(seller);
    }


    @Get("all-customer")
    @ApiOperation({ summary: "Get all customers with pagination" })
    @ApiQuery({
        name: "limit",
        example: 10,
        description: "Number of records to fetch",
    })
    @ApiQuery({
        name: "offset",
        example: 0,
        description: "Number of records to skip",
    })
    @ApiResponse({
        status: 200,
        description: "Customers fetched successfully",
    })
    gellAllCustomer(
        @Query("limit", ParseIntPipe) limit: number,
        @Query("offset", ParseIntPipe) offset: number,
    ): Promise<any[]> {
        return this.adminService.getAllCustomer(limit, offset);
    }



    @Get("count")
    @ApiOperation({ summary: "Get user count grouped by city" })
    @ApiResponse({
        status: 200,
        description: "City-wise user count fetched",
    })
    getCount(): Promise<{ city: string; count: number }[]> {
        return this.adminService.getCount();
    }


    @Get("search/:city")
    @ApiOperation({ summary: "Search users by city" })
    @ApiParam({
        name: "city",
        example: "sao paulo",
        description: "City name",
    })
    @ApiResponse({
        status: 200,
        description: "Users fetched successfully",
    })
    searchUser(@Param("city") city: string): Promise<any[]> {
        return this.adminService.searchUser(city);
    }
}