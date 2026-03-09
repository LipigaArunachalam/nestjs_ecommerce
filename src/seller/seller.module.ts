import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose'; 
import { user , UserSchema} from 'src/schema/user.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : Product.name , schema : ProductSchema},{name : user.name , schema : UserSchema}])],
  controllers: [SellerController],
  providers: [SellerService]
})
export class SellerModule {}
