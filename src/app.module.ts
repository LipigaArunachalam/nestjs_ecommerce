import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItemModule } from './order-items/order-items.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentModule } from './payments/payment.module';

import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { SellerModule } from './seller/seller.module';
import { ProductModule } from './product/product.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrdersModule } from './orders/orders.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB'),
      }),
    }),
<<<<<<< HEAD
   ProductModule, SellerModule, ConfigModule, AdminModule,AuthModule, MailModule, UserModule,OrderItemModule,PaymentModule,OrdersModule],
=======
   ProductModule, SellerModule, ConfigModule, AdminModule, OrdersModule, AuthModule, MailModule, UserModule,OrderItemModule,PaymentModule],
>>>>>>> 1e995a4745e1a66de515386d36c243fa514f94e7
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

