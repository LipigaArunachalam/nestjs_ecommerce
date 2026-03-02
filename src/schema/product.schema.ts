
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({collection: 'products'})
export class Product extends Document {
  @Prop({isRequired:true, unique:true})
  product_id: string;

  @Prop({isRequired:true})
  seller_id: string;
  
  @Prop({isRequired:true})
  product_category_name: string;

  @Prop()
  product_photos_qty: number;

  @Prop()
  product_weight_g: number;

  @Prop()
  product_length_cm: number;

  @Prop()
  product_height_cm: number;

  @Prop()
  product_width_cm: number;

  @Prop({default:false, select : false})
  is_deleted : boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
