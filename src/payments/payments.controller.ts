import { UpdatePaymentDto } from './dto/update.payment.dto';
import { Controller, Get, Post, Patch, Query, Param, NotFoundException, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import mongoose from 'mongoose';
import { CreatePaymentDto } from './dto/create.payment.dto';
import { RolesGuard } from './../utility/guards/role.guard';
import { JwtAuthGuard } from 'src/utility/guards/auth.guard';
import { Roles } from 'src/utility/decorators/role.decorator';
import { Role } from 'src/utility/enum/role.enum';

@Controller('payments')
export class PaymentsController {
    constructor( private paymentService: PaymentsService) {}
    // @Get()
    // getPayment() {
    //     return this.paymentService.getPayment();
    // }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
    @Get()
    getPaymentByPage(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        return this.paymentService.getPaymentByPage(page, limit);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)    
    @Get('search/:payment_type')
    searchByType(@Param('payment_type') payment_type: string) {
        return this.paymentService.searchByType(payment_type);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get("total-payment/:payment_type")
    getTotalPaymentByType(@Param('payment_type') payment_type: string) {
        return this.paymentService.getTotalPaymentByType(payment_type);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Customer)
    @Get(':id')
    getPaymentById(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Payment Not found');
        return this.paymentService.getPaymentById(id);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    createPayment(@Body() createPaymentDto:CreatePaymentDto) {
        return this.paymentService.createPayment(createPaymentDto);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch("update/:id")
    updatePayment(@Param('id') id: string, updatePayementDto:UpdatePaymentDto) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Payment Not found');
        return this.paymentService.updatePayment(id, updatePayementDto);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Patch('delete/:id')
    DeletePayment(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if(!isValidId) throw new NotFoundException('Payment Not found');
        return this.paymentService.deletePayment(id);
    }
}
