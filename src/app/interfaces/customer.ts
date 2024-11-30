export enum CustomerType {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
}

export interface ICustomers {
  consumerNumber: number;
  fullName: string;
  address: string;
  email: string;
  mobileNumber: string;
  customerType: CustomerType;
  userId: string;
  password: string;
  confirmPassword: string;
}
