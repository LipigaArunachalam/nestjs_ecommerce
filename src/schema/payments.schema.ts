<<<<<<< HEAD

=======
>>>>>>> 9cdf79e4e734ab5984714871da760c95dd88473b
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "payments"})
export class Payment{
    @Prop({required: true})
    order_id: string;
    @Prop({required: true})
    payment_sequential: number;
    @Prop({required: true})
    payment_type: string;
    @Prop({required: true})
    payment_installments: number;
    @Prop()
    payment_value: number;
    @Prop({default: false})
    is_deleted: boolean;

}

export const paymentSchema = SchemaFactory.createForClass(Payment);