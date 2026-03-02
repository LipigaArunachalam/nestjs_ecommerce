import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
        @IsString()
        order_id: string;
        @IsNumber()
        payment_sequential: number;
        @IsString()
        payment_type: string;
        @IsNumber()
        payment_installments: number;
        @IsNumber()
        payment_value: number;
        @IsBoolean()
        is_deleted: boolean;
}