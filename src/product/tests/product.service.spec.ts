import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from '../product.repository';
import { ProductService } from '../product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: {
            getAllProducts: jest.fn(),
            getProductById: jest.fn(),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const mockProducts = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ];
      jest
        .spyOn(productRepository, 'getAllProducts')
        .mockResolvedValueOnce(mockProducts as never);

      const result = await productService.getAllProducts();

      expect(result).toEqual(mockProducts);
    });
  });

  describe('getProductById', () => {
    it('should return a product by ID', async () => {
      const productId = '1';
      const mockProduct = { id: '1', name: 'Product 1' };
      jest
        .spyOn(productRepository, 'getProductById')
        .mockResolvedValueOnce(mockProduct as never);

      const result = await productService.getProductById(productId);

      expect(result).toEqual(mockProduct);
      expect(productRepository.getProductById).toHaveBeenCalledWith(productId);
    });
  });
});
