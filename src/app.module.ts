<<<<<<< HEAD
import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { OrderItemModule } from './order-items/order-items.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentModule } from './payments/payment.module';

import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { SellerModule } from './seller/seller.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
=======
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { SellerModule } from './seller/seller.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,}),
      MongooseModule.forRootAsync({
      imports: [ConfigModule],
>>>>>>> 9cdf79e4e734ab5984714871da760c95dd88473b
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB'),
      }),
    }),
<<<<<<< HEAD
    AuthModule,
    OrdersModule,
    OrderItemModule,
    PaymentModule,
    ProductModule, 
    SellerModule,  AdminModule,
    AuthModule, 
    MailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule  {
 
}
=======
   ProductModule, SellerModule, ConfigModule, AdminModule,AuthModule, MailModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
>>>>>>> 9cdf79e4e734ab5984714871da760c95dd88473b
