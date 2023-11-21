import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../customer.controller';
import { CustomerService } from '../customer.service';
import { AuthGuard } from '../../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

describe('CustomerController', () => {
  let controller: CustomerController;
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            getAllCustomers: jest.fn(),
            getCustomerById: jest.fn(),
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

    controller = module.get<CustomerController>(CustomerController);
    customerService = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCustomers', () => {
    it('should return an array of customers', async () => {
      const mockedCustomers = [
        {
          customer_id: 'CUST001',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, Anytown, USA',
        },
        {
          customer_id: 'CUST002',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+1 (555) 987-6543',
          address: '456 Elm Ave, Sometown, USA',
        },
      ];
      jest
        .spyOn(customerService, 'getAllCustomers')
        .mockResolvedValueOnce(mockedCustomers);

      const result = await controller.getAllCustomers();

      expect(result).toEqual(mockedCustomers);
      expect(customerService.getAllCustomers).toHaveBeenCalled();
    });
  });

  describe('getCustomerById', () => {
    it('should return a customer when a valid id is provided', async () => {
      const customerId = 'CUST001';
      const mockedCustomer = {
        customer_id: customerId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Anytown, USA',
      };
      jest
        .spyOn(customerService, 'getCustomerById')
        .mockResolvedValueOnce(mockedCustomer);

      const result = await controller.getCustomerById(customerId);

      expect(result).toEqual(mockedCustomer);
      expect(customerService.getCustomerById).toHaveBeenCalledWith(customerId);
    });

    it('should throw NotFoundException when an invalid id is provided', async () => {
      const invalidCustomerId = 'INVALID_ID';
      jest
        .spyOn(customerService, 'getCustomerById')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        controller.getCustomerById(invalidCustomerId),
      ).rejects.toThrow(NotFoundException);
      expect(customerService.getCustomerById).toHaveBeenCalledWith(
        invalidCustomerId,
      );
    });
  });
});
