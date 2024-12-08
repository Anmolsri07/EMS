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
