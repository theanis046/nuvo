import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { NotFoundException } from '@nestjs/common';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: {
            getCustomerById: jest.fn(),
            getAllCustomers: jest.fn(),
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCustomerById', () => {
    it('should return the customer when a valid id is provided', async () => {
      const mockedCustomer = {
        customer_id: 'CUST001',
        name: 'anis',
        email: 'anis.rehman046@gmail.com',
        phone: '+1123456789',
        address: 'hamburg, germany',
      };
      jest
        .spyOn(customerRepository, 'getCustomerById')
        .mockResolvedValueOnce(mockedCustomer as never);

      const result = await customerService.getCustomerById('CUST001');

      expect(result).toEqual(mockedCustomer);
      expect(customerRepository.getCustomerById).toHaveBeenCalledWith(
        'CUST001',
      );
    });

    it('should throw NotFoundException when an invalid id is provided', async () => {
      const invalidCustomerId = 'NotFoundId';
      jest
        .spyOn(customerRepository, 'getCustomerById')
        .mockResolvedValueOnce(null as never);

      await expect(
        customerService.getCustomerById(invalidCustomerId),
      ).rejects.toThrow(NotFoundException);
      expect(customerRepository.getCustomerById).toHaveBeenCalledWith(
        invalidCustomerId,
      );
    });
  });

  describe('getAllCustomers', () => {
    it('should return an array of customers', async () => {
      const mockedCustomers = [
        {
          customer_id: 'CUST001',
          name: 'anis',
          email: 'anis.rehman046@gmail.com',
          phone: '+1123456789',
          address: 'hamburg, germany',
        },
        {
          customer_id: 'CUST002',
          name: 'yousuf',
          email: 'yousuf@gmail.com',
          phone: '+1123456789',
          address: 'hamburg, germany',
        },
      ];
      jest
        .spyOn(customerRepository, 'getAllCustomers')
        .mockResolvedValueOnce(mockedCustomers as never);

      const result = await customerService.getAllCustomers();

      expect(result).toEqual(mockedCustomers);
      expect(customerRepository.getAllCustomers).toHaveBeenCalled();
    });
  });
});
