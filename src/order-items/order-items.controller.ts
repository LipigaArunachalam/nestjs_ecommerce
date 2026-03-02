import { Controller, Get, Post, Patch, Param, Body, NotFoundException, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import mongoose from 'mongoose';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create.order-item.dto';
import { UpdateOrderItemDto } from './dto/update.order-item.dto';
import { RolesGuard } from 'src/auth/role.guard';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/role.decorator';

@Controller('order-items')
export class OrderItemsController {
    constructor( private orderItemService: OrderItemsService) {}

    // @Get()
    // getOrderItem() {
    //     return this.orderItemService.getOrderItems()
    // }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
    @Get()
    getOrderItem(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        return this.orderItemService.getOrderItemByPage(page, limit);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get("seller-cost/:seller_id")
    getTotalPriceBySellerId(@Param('seller_id') seller_id: string) {
        return this.orderItemService.getTotalPriceBySellerId(seller_id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get("product-cost/:product_id")
    getTotalPriceByProductId(@Param('product_id') product_id: string) {
        return this.orderItemService.getTotalPriceByProductId(product_id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get("expense-by-seller/:seller_id")
    getExpenseBySellerId(@Param('seller_id') seller_id: string) {
        return this.orderItemService.getExpenseBySellerId(seller_id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Roles(Role.Admin, Role.Customer)
    @Get(':id')
    getOrderItemById(@Param('id') id: string ) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException("order item not found");
        return this.orderItemService.getOrderItemById(id);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    createOrderItem(@Body() createOrderItemDto: CreateOrderItemDto) {
        return this.orderItemService.createOrderItem(createOrderItemDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch(':id')
    updateOrderItem(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException("order item not found");
        return this.orderItemService.updateOrderItem(id, updateOrderItemDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch(':id')
    deleteOrderitem(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException("order item not found");
        return this.orderItemService.deleteOrderItem(id);
    }

}
