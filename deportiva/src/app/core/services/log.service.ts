import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from './log.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:3025/api/logs'; // URL de tu backend

  constructor(private http: HttpClient) {}

  getLogs(): Observable<Log[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Log[]>(this.apiUrl, { headers });
  }

  addLog(log: Log): Observable<Log> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Log>(this.apiUrl, log, { headers });
  }
}
