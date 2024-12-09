import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICustomers, ILogin } from '../interfaces/users';
import { IBill } from '../interfaces/bills';
import { IComplaint } from '../interfaces/complaint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.SERVER_URL;
  constructor(private http: HttpClient) {}

  loginCustomer(payload: ILogin) {
    // TODO: Add customer login endpoint 👇
    return this.http.post(`${this.baseUrl}/api/auth/login`, payload);
  }

  // loginAdmin(payload: ILogin) {
  //   // TODO: Add admin login endpoint 👇
  //   return this.http.post(`${this.baseUrl}/api/admin/login`, payload);
  // }

  createNewCustomer(payload: ICustomers) {
    return this.http.post(`${this.baseUrl}/api/customers/register`, payload);
  }
  ///search
  getConsumerByCustomerId(customerId: string) {
    return this.http.get(
      `${this.baseUrl}/apiAdmin/getAllConsumersWithCustomer/${customerId}`
    );
  }

  getAllConsumers(ConsumersId: string) {
    return this.http.get(
      `${this.baseUrl}/apiAdmin/getAllConsumerId/${ConsumersId}`
    );
  }

  createBill(payload: IBill) {
    return this.http.post(`${this.baseUrl}/apiAdmin/addBill`, payload);
  }

  getAllBills(customerId: string) {
    return this.http.get(`${this.baseUrl}/api/viewBill/${customerId}`);
  }

  getAllComplaint(customerId: string) {
    return this.http.get(`${this.baseUrl}/api/viewComplaint/${customerId}`);
  }

  createComplaint(payload: IComplaint) {
    return this.http.post(`${this.baseUrl}/api/register/complaint`, payload);
  }

  payBill(paymentMode: string, billNumbers: string, payableAmount: number) {
    const data = {
      payableAmount: +payableAmount,
      billNumber: +billNumbers,
      paymentMode: paymentMode,
    };
    return this.http.post(`${this.baseUrl}/api/pay`, data);
  }

  getAdminAllBills() {
    return this.http.get(`${this.baseUrl}/apiAdmin/viewBill`)
  }
}
