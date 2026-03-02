import {IsString, IsNumber ,IsNotEmpty, IsBoolean} from "class-validator";

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

    @IsBoolean()
    is_deleted: boolean;

    

}