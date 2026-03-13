
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({collection: 'carts'})
export class Cart extends Document {
  @Prop({isRequired:true, unique:true})
  product_id: string;

  @Prop({isRequired:true})
  user_id: string;

  @Prop({default:false, select : false})
  is_deleted : boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
