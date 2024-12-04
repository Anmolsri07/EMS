import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICustomers } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.SERVER_URL
  constructor(private http: HttpClient) {}

  createNewCustomer(payload: ICustomers) {
    this.http.post(`${this.baseUrl}/api/customers/register`, payload)
  }
}
