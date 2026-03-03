import {IsString, IsNumber ,IsNotEmpty, IsBoolean} from "class-validator";

export class CreateSellerDto{
    @IsNotEmpty()
    @IsString()
    user_id : string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNumber()
    zip_code: number;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    username: string;

    @IsString()
    email: string;

}