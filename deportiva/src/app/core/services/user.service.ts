import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3025/api'; // URL de tu backend

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers });
  }

  addUser(user: User): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<User>(`${this.apiUrl}/user/register`, user, { headers });
  }

  updateUser(id: string, user: User): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<User>(`${this.apiUrl}/user/${id}`, user, { headers });
  }

  deleteUser(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<any>(`${this.apiUrl}/user/${id}`, { headers });
  }
}
