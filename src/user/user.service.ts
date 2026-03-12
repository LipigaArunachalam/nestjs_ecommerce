import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './../schema/orders.schema';
import { user } from './../schema/user.schema';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    constructor(@InjectModel(Order.name) private OrderModel: Model<Order>, @InjectModel(user.name) private UserModel: Model<user>) { }
    async getAllProduct(uid: string, limit: number, offset: number) {
        const data = await this.OrderModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                    customer_id: uid
                }
            },
            {
                $lookup: {
                    from: 'order-items',
                    localField: 'order_id',
                    foreignField: 'order_id',
                    as: 'cust_orders'
                }
            },
            {
                $unwind: '$cust_orders',

            },
            {
                $lookup: {
                    from: 'payments',
                    localField: 'order_id',
                    foreignField: 'order_id',
                    as: 'cust_pay'
                }
            },
            {
                $unwind: '$cust_pay'

            },
            {
                $project: {
                    _id: 0,
                    shipping_limit_date: '$cust_orders.shipping_limit_date',
                    product_id: '$cust_orders.product_id',
                    seller_id: '$cust_orders.seller_id',
                    price: '$cust_orders.price',
                    status: '$order_status',
                    payment_type: '$cust_pay.payment_type',
                    Installation: '$cust_pay.payment_installments',
                    freight_value: '$cust_pay.freight_value',
                }
            },
            {
                $skip: offset ? Number(offset) : 0
            },
            {
                $limit: limit ? Number(limit) : 10
            }
        ])
        return data;
    }

    async getDetails(user_id: string) {
        const data = await this.UserModel.findOne({
            user_id,
            is_deleted: false,
        });
        console.log(data)
        return data;
    }

    async getProducts() {

    }
}
