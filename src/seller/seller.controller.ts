import { Controller, Get, Patch, Param,Body,ValidationPipe,Query , Post} from '@nestjs/common';
import { SellerService } from './seller.service';
import{ Product } from 'src/schema/product.schema';
import{ CreateProductDto, UpdateProductDto } from './seller.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('seller')
@UseGuards(JwtAuthGuard)
export class SellerController {
    constructor(private sellerService : SellerService){}

    @Get("all-product/:sid")
    getAllProduct(@Param('sid') sid: string): Promise<Product[]>{
       return this.sellerService.getAllProduct(sid);
    }

    @Post("add-product/:sid")
    createProduct(@Body(ValidationPipe) product : CreateProductDto,@Param('sid') sid : string): Promise<string>{
        return this.sellerService.createProduct(product, sid);
    }

    @Patch("del-product")
    deleteProduct(@Query('product_id') pid? : string, 
    @Query('product_category_name') pname? : string):Promise<string>{
        return this.sellerService.deleteProduct(pid, pname);
    }

    @Patch("upd")
    updateProduct(@Query('product_id') pid?: string, @Body(ValidationPipe) upd ?: UpdateProductDto):Promise<string>{
        return this.sellerService.updateProduct(pid, upd);
    }

    @Get(":name")
    getSearch(@Param('name') name: string): Promise<Product[]>{
        return this.sellerService.getSearch(name);
    }
}
