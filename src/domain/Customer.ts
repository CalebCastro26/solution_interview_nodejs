export class Customer {
  id: string;

  name: string;

  lastName: string;

  email: string;

  phone: string;
  constructor(data?: Partial<Customer>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
