// import {IsString, IsNumber ,IsNotEmpty, IsBoolean} from "class-validator";

// export class CreateSellerDto{
//     @IsNotEmpty()
//     @IsString()
//     user_id : string;

//     @IsNotEmpty()
//     @IsString()
//     password: string;

//     @IsNumber()
//     zip_code: number;

//     @IsString()
//     city: string;

//     @IsString()
//     state: string;

//     @IsString()
//     username: string;

//     @IsString()
//     email: string;

// }

import { IsString, IsNumber, IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSellerDto {
//   @ApiProperty({ example: "8bd0f31cf0a614c658f6763bd02dea69" })
//   @IsNotEmpty()
//   @IsString()
//   user_id: string;

  @ApiProperty({ example: "vcollofb" })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 1222 })
  @IsNumber()
  zip_code: number;

  @ApiProperty({ example: "sao paulo" })
  @IsString()
  city: string;

  @ApiProperty({ example: "SP" })
  @IsString()
  state: string;

  @ApiProperty({ example: "vcollofb" })
  @IsString()
  username: string;

  @ApiProperty({ example: "vcollofb@gmail.com" })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}