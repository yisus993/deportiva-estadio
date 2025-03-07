import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './clientes.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3025/api/clients';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Customer[]>(this.apiUrl, { headers });
  }

  searchClientes(term: string): Observable<Customer[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Customer[]>(`${this.apiUrl}/search?term=${term}`, { headers });
  }

  addCustomer(customer: Customer): Observable<Customer> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Customer>(this.apiUrl, customer, { headers });
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer, { headers });
  }

  deleteCustomer(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
