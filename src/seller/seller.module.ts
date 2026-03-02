import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose'; 

@Module({
  imports : [MongooseModule.forFeature([{name : Product.name , schema : ProductSchema}])],
  controllers: [SellerController],
  providers: [SellerService]
})
export class SellerModule {}
