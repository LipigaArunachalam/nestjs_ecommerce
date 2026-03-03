// import {IsString, IsNumber ,IsNotEmpty, IsBoolean} from "class-validator";
// import { PartialType} from '@nestjs/mapped-types';

// export class CreateProductDto{
//     @IsNotEmpty()
//     @IsString()
//     product_id : string;

//     @IsString()
//     product_category_name : string;

//     @IsNumber()
//     product_photos_qty : number;

//     @IsNumber()
//     product_weight_g : number;

//     @IsNumber()
//     product_length_cm : number;

//     @IsNumber()
//     product_height_cm : number;

//     @IsNumber()
//     product_width_cm : number;

//     @IsBoolean()
//     is_deleted: boolean;   

// }

// export class UpdateProductDto extends PartialType(CreateProductDto){}

import { IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'PROD123' })
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @ApiProperty({ example: 'electronics' })
  @IsString()
  product_category_name: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  product_photos_qty: number;

  @ApiProperty({ example: 500 })
  @IsNumber()
  product_weight_g: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  product_length_cm: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  product_height_cm: number;

  @ApiProperty({ example: 15 })
  @IsNumber()
  product_width_cm: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  is_deleted: boolean;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}