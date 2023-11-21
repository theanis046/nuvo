import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  getAllProducts() {
    return this.productRepository.getAllProducts();
  }

  getProductById(productId: string) {
    return this.productRepository.getProductById(productId);
  }
}
