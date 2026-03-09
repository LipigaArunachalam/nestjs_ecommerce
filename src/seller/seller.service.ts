import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import{ CreateProductDto, UpdateProductDto } from './dto/seller.dto';
import {Product} from './../schema/product.schema';
import {user} from './../schema/user.schema'
  
@Injectable()
export class SellerService {

    constructor(@InjectModel(Product.name) private ProductModel: Model<Product>,@InjectModel(user.name) private UserModel: Model<user>) {}
    async getAllProduct(sid:string){
       const data = await this.ProductModel.find({is_deleted:false, seller_id:sid});
       return data;
    }

    async createProduct(product : CreateProductDto, sid: string){
      const data = await this.ProductModel.create({...product, is_deleted:false, seller_id : sid});
      return "product added";
    }

    async getSearch(sid:string,name: string){
       const data = await this.ProductModel.find({product_category_name: {$regex : name, $options : "i"} , is_deleted:false, seller_id:sid});
       return data;
    }

    async deleteProduct( sid: string,pid?: string,pname?:string){
      if(pid){
        const data = await this.ProductModel.updateOne({product_id : pid,seller_id:sid}, {$set:{is_deleted: true}});
        console.log(data);
        if (data.matchedCount === 0) return "No product found with that ID";
        return "deleted successfully";
  
      }
      const data = await this.ProductModel.updateMany({product_category_name : pname}, {$set:{is_deleted: true}});
      if (data.matchedCount === 0) return "No product found with that ID";
        return "deleted successfully";
    }

    async updateProduct(sid: string,pid: string, upd : UpdateProductDto){
      if(!pid){
         return "nothing to update";
      }
      const data = await this.ProductModel.findOneAndUpdate({product_id:pid,seller_id:sid}, upd, {returnDocument:"after"})
      return "success";
    }

    async getDetails(email: string) {
            const data = await this.UserModel.findOne({
                email,
                is_deleted: false,
            }).select('-_id username email role city state zip_code');
            console.log(data)
            return data;
        }
}
