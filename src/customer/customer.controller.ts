import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

const CustomerService = Symbol('customerService');

@Controller('customer')
export class CustomerController {
  constructor(
    @Inject(CustomerService) private readonly customerService: any, //Todo
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.customerService.getCustomers(
      signInDto.username,
      signInDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  getCustomers() {
    return 'customer';
  }
}
