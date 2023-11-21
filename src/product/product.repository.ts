import { products } from '../Mocks/products';

export class ProductRepository {
  getAllProducts() {
    return products;
  }

  getProductById(productId: string) {
    return products.find((product) => product.product_id === productId);
  }
}
