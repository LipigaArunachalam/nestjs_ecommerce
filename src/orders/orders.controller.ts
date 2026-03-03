import { Controller, Get, Param, Post, Body, Patch, Query, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { UpdateOrderDto } from './dto/update.order.dto';
import mongoose from 'mongoose';
import { RolesGuard } from 'src/utility/guards/role.guard';
import { JwtAuthGuard } from 'src/utility/guards/auth.guard';
import { Roles } from 'src/utility/decorators/role.decorator';
import { Role } from 'src/utility/enum/role.enum';

@ApiTags('orders')
@ApiBearerAuth()
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
    @ApiOperation({ summary: 'Retrieve orders with pagination' })
    @ApiQuery({ name: 'page', type: Number, required: true, description: 'Page number' })
    @ApiQuery({ name: 'limit', type: Number, required: true, description: 'Items per page' })
    @ApiResponse({ status: 200, description: 'Paginated orders returned' })
    getOrderByPage(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
     ) {
        return this.orderService.getOrderByPage(page, limit);
     }

     @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(Role.Admin)
     @Get('order-status/:order_status')
     @ApiOperation({ summary: 'Get order revenue filtered by status' })
     @ApiParam({ name: 'order_status', description: 'Status to filter orders' })
     @ApiResponse({ status: 200, description: 'Revenue calculated' })
     getOrderRevenueByStatus(@Param('order_status') order_status: string) {
        return this.orderService.getOrderRevenueByStatus(order_status);
     }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
    @Get(':id') 
    @ApiOperation({ summary: 'Retrieve a single order by ID' })
    @ApiParam({ name: 'id', description: 'Order identifier' })
    @ApiResponse({ status: 200, description: 'Order returned' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    getOrdersById(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Order Not found');
        return this.orderService.getOrderById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'Order created successfully' })
    createOrder(@Body() createOrderDto:CreateOrderDto){
        return this.orderService.createOrder(createOrderDto);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch('update/:id')
    @ApiOperation({ summary: 'Update an existing order' })
    @ApiParam({ name: 'id', description: 'Order identifier' })
    @ApiResponse({ status: 200, description: 'Order updated successfully' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    updateOrder(@Param('id') id: string,@Body() updateOrderDto: UpdateOrderDto) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Order Not found');
        return this.orderService.updateOrder(id, updateOrderDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch('delete/:id')
    @ApiOperation({ summary: 'Soft delete an order' })
    @ApiParam({ name: 'id', description: 'Order identifier' })
    @ApiResponse({ status: 200, description: 'Order deleted successfully' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    deleteOrder (@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Order Not found');
        return this.orderService.deleteOrder(id);
    }

    
}
