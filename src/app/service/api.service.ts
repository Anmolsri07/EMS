import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICustomers, ILogin } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.SERVER_URL
  constructor(private http: HttpClient) { }

  loginCustomer(payload: ILogin) {
    // TODO: Add customer login endpoint 👇
    return this.http.post(`${this.baseUrl}/api/auth/login`, payload);
  }

  // loginAdmin(payload: ILogin) {
  //   // TODO: Add admin login endpoint 👇
  //   return this.http.post(`${this.baseUrl}/api/admin/login`, payload);
  // }

  createNewCustomer(payload: ICustomers) {
    return this.http.post(`${this.baseUrl}/api/customers/register`, payload)
  }

  getCustomerByCustomerId(customerId: string) {
    return this.http.get(
      `${this.baseUrl}/apiAdmin/getAllConsumers/${customerId}`
    );
  }
}
