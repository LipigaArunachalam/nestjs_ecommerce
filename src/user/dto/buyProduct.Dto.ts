import { IsString, IsNumber } from "class-validator";

export class BuyProductDto{

  @IsString()
  product_id: string;

  @IsNumber()
  quantity: number;

  @IsString()
  customer_id: string;

  @IsString()
  payment_type: string;

  @IsNumber()
  payment_installments: number;
}

