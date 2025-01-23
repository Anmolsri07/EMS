export enum CustomerType {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
}

export enum UserType {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface ILogin {
  userId: string;
  password: string;
  role: UserType;
}

export interface ICustomers {
  customerId: number;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  customerType: CustomerType;
  userId: string;
  password: string;
  confirmPassword: string;
  role: UserType;
}

// private long consumerId;
// private long customerId;
// private String address;
// private String mobileNumber;
// private String customerType;

export interface IConsumer {
  consumerId: string;
  customerId: string;
  address: string;
  mobileNumber: string;
  customerType: CustomerType;
}
