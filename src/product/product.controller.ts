import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(ProductService) private readonly productService: ProductService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getProducts() {
    return this.productService.getAllProducts();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
}
