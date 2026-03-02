import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateOrderItemDto {
        @IsString()
        order_id: string;
        @IsNumber()
        order_item_id: number;
        @IsString()
        product_id: string;
        @IsString()
        seller_id: string;
        @IsString()
        shipping_limit_date: string;
        @IsNumber()
        price: number;
        @IsNumber()
        freight_value: number;
        @IsBoolean()
        is_deleted: boolean;
}