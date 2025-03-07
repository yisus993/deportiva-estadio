import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = 'http://localhost:3025/api/user/login';
  private tokenKey = 'authToken';
  private LOGOUT_URL = 'http://localhost:3025/api/user/logout'; // Añadir URL de logout
  private apiUrl = 'http://localhost:3025/api/auth'; // Añadir esta línea

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, { user, password }).pipe(
      tap((response) => {
        if (response.token) {
          console.log(response.token);
          this.setToken(response.token);
        }
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  getCurrentUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id,
      username: payload.user,
      role: payload.role // Asegúrate de que esto coincida con el payload del token
    };
  }

  logout(): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.logUserAction('logout', `Usuario ${currentUser.username} cerró sesión.`);
    }
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // Método para registrar la acción del usuario
  logUserAction(action: string, details: string): void {
    const url = 'http://localhost:3025/api/logs'; // URL de tu endpoint de logs
    const log = {
      user: this.getCurrentUser()?.username,
      action,
      details,
      timestamp: new Date()
    };
    this.httpClient.post(url, log).subscribe({
      error: (error) => {
        console.error('Error al registrar la acción del usuario:', error);
      }
    });
  }

  // Nuevas funciones para recuperación de contraseña
  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/reset-password`, { token, newPassword });
  }
}
