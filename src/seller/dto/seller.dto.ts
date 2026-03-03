import {IsString, IsNumber ,IsNotEmpty, IsBoolean} from "class-validator";

import { PartialType} from '@nestjs/mapped-types';

export class CreateSellerDto{
    @IsNotEmpty()
    @IsString()
    seller_id : string;

    @IsNumber()
    seller_zip_code_prefix: number;

    @IsString()
    seller_city: string;

    @IsString()
    seller_state: string;

}

export class CreateProductDto{
    @IsNotEmpty()
    @IsString()
    product_id : string;

    @IsString()
    product_category_name : string;

    @IsNumber()
    product_photos_qty : number;

    @IsNumber()
    product_weight_g : number;

    @IsNumber()
    product_length_cm : number;

    @IsNumber()
    product_height_cm : number;

    @IsNumber()
    product_width_cm : number;

}

export class UpdateProductDto extends PartialType(CreateProductDto){}