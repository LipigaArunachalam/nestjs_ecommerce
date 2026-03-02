import { Controller, Get, Param, Post, Body, Patch, Query, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { UpdateOrderDto } from './dto/update.order.dto';
import mongoose from 'mongoose';
import { RolesGuard } from 'src/auth/role.guard';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';



@Controller('orders')
export class OrdersController {
    constructor( private orderService: OrdersService) {}
    // @Get()
    // getOrders() {
    //     return this.orderService.getOrder()
    // }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
    @Get()
    getOrderByPage(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
     ) {
        return this.orderService.getOrderByPage(page, limit);
     }

     @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(Role.Admin)
     @Get('order-status/:order_status')
     getOrderRevenueByStatus(@Param('order_status') order_status: string) {
        return this.orderService.getOrderRevenueByStatus(order_status);
     }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
    @Get(':id') 
    getOrdersById(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Order Not found');
        return this.orderService.getOrderById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    createOrder(@Body() createOrderDto:CreateOrderDto){
        return this.orderService.createOrder(createOrderDto);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch('update/:id')
    updateOrder(@Param('id') id: string,@Body() updateOrderDto: UpdateOrderDto) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Order Not found');
        return this.orderService.updateOrder(id, updateOrderDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch('delete/:id')
    deleteOrder (@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Order Not found');
        return this.orderService.deleteOrder(id);
    }

    
}
