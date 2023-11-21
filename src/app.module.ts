import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductController } from './product/product.controller';
import { CustomerController } from './customer/customer.controller';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [AuthModule, UsersModule, ProductModule, CustomerModule],
  controllers: [AppController, ProductController, CustomerController],
  providers: [AppService],
})
export class AppModule {}
