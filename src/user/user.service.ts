import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './../schema/orders.schema';
import {user} from './../schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(Order.name) private OrderModel: Model<Order>,@InjectModel(user.name) private UserModel: Model<user>) {}
        async getAllProduct(uid:string){
           const data =await this.OrderModel.aggregate([
            {
                $match:{
                    is_deleted:false,
                    customer_id:uid
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
                $unwind: '$cust_orders'
            },
            {
                $lookup:{
                    from: 'payments',
                    localField:'order_id',
                    foreignField:'order_id',
                    as:'cust_pay'
                }
            },
            {
                $unwind: '$cust_pay',
            },
            {
                $project:{
                    _id:0,
                    shipping_limit_date: '$cust_orders.shipping_limit_date',
                    product_id : '$cust_orders.product_id',
                    seller_id : '$cust_orders.seller_id',
                    price : '$cust_orders.price',
                    status : '$cust_orders.order_status',
                    payment_type:'$cust_pay.payment_type',
                    Installation: '$cust_pay.payment_installments',
                    freight_value:'$cust_pay.freight_value'
                }
            }
           ])
           return data;
        }

        async getDetails(uid:string){
            const data =await this.UserModel.aggregate([
                {
                    $match:{
                        is_deleted:false, 
                        user_id:uid,
                    }
                },
                {
                    $project:{
                        _id:0,
                        username: 1,
                        email:1,
                        role:1,
                        city:1,
                        state:1,
                        zip_code:1
                    }
                }
            ])
            return data;
        }
}
