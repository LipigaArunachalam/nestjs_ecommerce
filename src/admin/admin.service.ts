import { Injectable } from '@nestjs/common';
import { user } from './../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSellerDto } from './admin.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AdminService {
    constructor(@InjectModel(user.name) private UserModel: Model<user>, private mailService: MailService) { }

    async getAllSeller() {
        //const data = await this.UserModel.find({is_deleted : false, role : "seller"});
        const data = await this.UserModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                    $text: { $search: "seller" }
                }
            },
            {
                $project: {
                    _id: 0,
                    seller_id: "$user_id",
                    seller_name: "$username",
                    seller_email: "$email",
                    seller_city: "$city",
                    seller_state: "$state",
                    seller_zip_code: "$zip_code",
                }
            }
        ]);
        return data;
    }

    async deleteSeller(sid: string) {
        const data = await this.UserModel.findOneAndUpdate({ user_id: sid, is_deleted: false }, { $set: { is_deleted: true } });
        if (!data) {
            return "no matched data";
        }
        return "success";
    }

    async getAllCustomer(limit?: number, offset?: number) {
        //const data = await this.CustomerModel.find({is_deleted : false});
        const data = await this.UserModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                    $text: { $search: "customer" }
                }
            },
            {
                $skip: Number(offset),
            },
            {
                $limit: Number(limit),
            },
            {
                $project: {
                    _id: 0,
                    customer_id: "$user_id",
                    customer_name: "$username",
                    customer_email: "$email",
                    customer_city: "$city",
                    customer_state: "$state",
                    customer_zip_code: "$zip_code",
                }
            }
        ]);
        return data;
    }

    async addSeller(seller: CreateSellerDto) {
        //const result= {user_id: seller.user_id, username:seller.username,email:seller.email, 
        // zip_code:seller.zip_code, city:seller.city, state: seller.state,role:"seller", is_deleted:false};
        const result = { ...seller, role: "seller", is_deleted: false };
        const data = await this.UserModel.create(result);
        if (!data) {
            return "failed to add";
        }
        console.log(data);
        await this.mailService.sendSellerCredentials(
            data.email,
            data.username,
            data.password,
        );
        return "successfuly added";
    }


    async getCount() {
        const data = await this.UserModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                    $text: { $search: "customer" }
                }
            },
            {
                $group: {
                    _id: "$city",
                    count: { $sum: 1 },
                }
            },
            {
                $project: {
                    city: '$_id',
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: { count: -1 }
            }
        ])
        return data;
    }

    async searchUser(city: string) {
        const data = await this.UserModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                    $text: { $search: city }
                }
            },
            {
                $group: {
                    _id: "$role",
                    users: {
                        $push: {
                            user_id: "$user_id",
                            email: "$email",
                            username: "$username",
                            role: "$role",
                        }
                    },
                    count: { $sum: 1 },
                }
            },
            {
                $limit: 100,
            }
        ]);
        return data;
    }
}
