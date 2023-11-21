import { customers } from '../Mocks/customers';

export class CustomerRepository {
  getAllCustomers() {
    return customers;
  }

  getCustomerById(customerId: string) {
    return customers.find((customer) => customer.customer_id === customerId);
  }
}
