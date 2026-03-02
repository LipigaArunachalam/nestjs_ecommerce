import { IsBoolean, IsString } from "class-validator";


export class CreateOrderDto {
        @IsString()
        order_id: string; 
        @IsString()
        customer_id: string;
        @IsString()
        order_status: string; 
        @IsString()
        order_purchase_timestamp: string; 
        @IsString()
        order_approved_at: string; 
        @IsString()
        order_delivered_carrier_date: string; 
        @IsString()
        order_delivered_customer_date: string; 
        @IsString()
        order_estimated_delivery_date: string; 
        @IsBoolean()
        is_deleted: boolean;
}