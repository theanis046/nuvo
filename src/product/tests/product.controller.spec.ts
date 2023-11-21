import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAllProducts: jest.fn(),
            getProductById: jest.fn(),
          },
        },
        AuthGuard,
      ],
      imports: [
        JwtModule.register({
          secret: 'secret',
        }),
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const mockedProducts = [];
      jest
        .spyOn(productService, 'getAllProducts')
        .mockResolvedValueOnce(mockedProducts as never);

      const result = await controller.getProducts();

      expect(result).toEqual(mockedProducts);
      expect(productService.getAllProducts).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    it('should return a product when a valid id is provided', async () => {
      const productId = 'PRODUCT001';
      const mockedProduct = {};
      jest
        .spyOn(productService, 'getProductById')
        .mockResolvedValueOnce(mockedProduct as never);

      const result = await controller.getProductById(productId);

      expect(result).toEqual(mockedProduct);
      expect(productService.getProductById).toHaveBeenCalledWith(productId);
    });

    it('should throw NotFoundException when an invalid id is provided', async () => {
      const invalidProductId = 'INVALID_ID';
      jest
        .spyOn(productService, 'getProductById')
        .mockRejectedValueOnce(new NotFoundException() as never);

      await expect(controller.getProductById(invalidProductId)).rejects.toThrow(
        NotFoundException,
      );
      expect(productService.getProductById).toHaveBeenCalledWith(
        invalidProductId,
      );
    });
  });
});
