import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({ collection: "orders"}) 
export class Order {
    @Prop({required: true})
    order_id: string; 
    @Prop({required: true} )
    customer_id: string;
    @Prop({required: true})
    order_status: string; 
    @Prop({required: true})
    order_purchase_timestamp: string; 
    @Prop({required: true})
    order_approved_at: string; 
    @Prop({required: true})
    order_delivered_carrier_date: string; 
    @Prop({required: true})
    order_delivered_customer_date: string; 
    @Prop({required: true})
    order_estimated_delivery_date: string; 
    @Prop({default: false})
    is_deleted: boolean;
}

export const orderSchema = SchemaFactory.createForClass(Order);