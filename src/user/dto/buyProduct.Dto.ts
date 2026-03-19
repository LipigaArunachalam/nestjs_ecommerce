import { Type } from 'class-transformer'
import { IsString, IsNumber ,IsArray, ValidateNested} from "class-validator";

export class BuyProductDto {

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

export class ItemDto {
  @IsString()
  product_id: string;

  @IsNumber()
  quantity: number;
}

export class BuyAllDto {
  @IsString()
  customer_id: string;

  @IsString()
  payment_type: string;

  @IsNumber()
  payment_installments: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}