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
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB'),
      }),
    }),
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
