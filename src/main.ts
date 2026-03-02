import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import  cookieParser from 'cookie-parser';

async function bootstrap() {
<<<<<<< HEAD

=======
>>>>>>> 9cdf79e4e734ab5984714871da760c95dd88473b
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); 
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,},
  }),
);
<<<<<<< HEAD
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 5000);
=======

  await app.listen(process.env.PORT ?? 3000);
>>>>>>> 9cdf79e4e734ab5984714871da760c95dd88473b
}
bootstrap();
