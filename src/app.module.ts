import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductController } from './product/product.controller';
import { CustomerController } from './customer/customer.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, ProductController, CustomerController],
  providers: [AppService],
})
export class AppModule {}
