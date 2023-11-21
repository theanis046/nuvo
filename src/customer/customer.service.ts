import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getCustomerById(id: string) {
    const customer = await this.customerRepository.getCustomerById(id);
    if (!customer) {
      throw new NotFoundException(`Customer not found by id: ${id}`);
    }
    return customer;
  }

  async getAllCustomers() {
    return await this.customerRepository.getAllCustomers();
  }
}
