import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './../schema/orders.schema';
import { user } from './../schema/user.schema';
import { Product } from 'src/schema/product.schema';
import * as crypto from 'crypto';
import { OrderItem } from 'src/schema/order-items.schema';
import { Cart, CartSchema } from 'src/schema/carts.schema'

@Injectable()
export class UserService {
    constructor(@InjectModel(Order.name) private OrderModel: Model<Order>, @InjectModel(user.name) private UserModel: Model<user>,
        @InjectModel(Product.name) private ProductModel: Model<Product>, @InjectModel(OrderItem.name) private OrderItemModel: Model<OrderItem>,
        @InjectModel(Cart.name) private CartModel: Model<Cart>) { }


    async getAllProduct(uid: string, limit?: number, offset?: number) {
        const data = await this.OrderItemModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                }
            },
            {
                $lookup: {
                    from: 'orders',
                    localField: 'order_id',
                    foreignField: 'order_id',
                    as: 'cust_orders'
                }
            },
            {
                $unwind: '$cust_orders',

            },
            {
                $match: {
                    "cust_orders.customer_id": uid
                }
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
                $unwind: '$cust_pay',
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_id',
                    foreignField: 'product_id',
                    as: 'product_details'
                }
            },
            {
                $unwind: '$cust_pay',
            },
            {
                $project: {
                    _id: 0,
                    order_id: '$order_id',
                    product_price: '$price',
                    freight_value: '$freight_value',
                    total_price: '$cust_pay.payment_value',
                    status: '$cust_orders.order_status',
                    payment_type: '$cust_pay.payment_type',
                    Installation: '$cust_pay.payment_installments',
                    estimated_delivery: '$cust_orders.order_estimated_delivery_date',
                    order_at: '$cust_orders.order_purchase_timestamp',
                    product_name: '$product_details.product_category_name',
                    product_img: '$product_details.product_image_url',
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

    async getProducts(limit?: number, offset?: number) {
        const data = await this.ProductModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                    product_qty: { $gt: 0 },
                }
            },
            {
                $skip: offset ? Number(offset) : 0,
            },
            {
                $limit: limit ? Number(limit) : 0,
            }
        ]);
        return data;
    }


    async addToCart(uid: string, pid: string) {
        const res = await this.CartModel.insertOne({ product_id: pid, user_id: uid });
        return res;
    }

    async cart(uid: string) {
        const data = await this.CartModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                    user_id: uid,
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product_id",
                    foreignField: "product_id",
                    as: "cart"
                }
            },
            {
                $project:{
                    product_category_name:'$cart.product_category_name',
                    product_image_url:'$cart.product_image_url',
                    price:'$cart.price',
                    product_weight_g:'$cart.product_weight_g',
                    product_height_cm:'$cart.product_height_cm',
                    product_width_cm:'$cart.product_width_cm',
                    product_qty:'$cart.product_qty'
                }
            }
        ]);
        return data;
    }
}
