import { UpdatePaymentDto } from './dto/update.payment.dto';
import { CreatePaymentDto } from './dto/create.payment.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from 'src/schema/payments.schema';
import path from 'path';

@Injectable()
export class PaymentsService {
    constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment> ) {}
    async getPaymentByPage(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const payments = await this.paymentModel.find(
            {is_deleted: false}
        )
        .skip(skip)
        .limit(limit)
        const totalPayments = await this.paymentModel.countDocuments({is_deleted: false});
        return {
            page,
            limit,
            totalPayments,
            totalPages: Math.ceil(totalPayments/limit),
            payments
        }
    }

    async getPaymentById(id: string) {
        const payment = await this.paymentModel.findOne(
            {_id: id, is_deleted: false},
        )
        if(!payment) {
            throw new NotFoundException("payment not found");
        }
        return payment;
    }

    async searchByType(type: string) {
        const payments = await this.paymentModel.aggregate([
            {   
                $search:{
                    index: 'default',
                    text: {
                        query: type,
                        path: 'payment_type',
                        fuzzy:{},
                    }
                }
            }
        ]).limit(20);
        return payments;
    }

    async getTotalPaymentByType(type: string) {
        const result = await this.paymentModel.aggregate([
                {
                $match: { 
                    payment_type: type, 
                    is_deleted: false 
                }
                },
                {
                // 2. Sum the values for that specific type
                $group: {
                    _id: "$payment_type",
                    totalPayment: { $sum: "$payment_value" }
                }
                }
            ]);
    return result;
    }

    async createPayment(createPaymentDto:CreatePaymentDto) {
        const newPayment = await new this.paymentModel(createPaymentDto);
        return newPayment;
    }

    async updatePayment(id: string, updatePaymentdto:UpdatePaymentDto) {
        const updatedPayment = await this.paymentModel.findOneAndUpdate(
            {_id: id , is_deleted: false},
            updatePaymentdto,
            {returnDocument: 'after'},
        )
        if(!updatedPayment) throw new NotFoundException("payment not found");
        return updatedPayment ;
    }

    async deletePayment(id: string) {
        const deletedPayment = await this.paymentModel.findOneAndUpdate(
            {_id: id, is_deleted: false},
            {is_deleted: true},
            {returnDocument: "after"}
        )
        if(!deletedPayment) throw new NotFoundException("payment not found");
        return deletedPayment;
    }
}

