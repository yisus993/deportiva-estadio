import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Importa tu servicio de autenticación

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Detectar solicitudes de logout
    if (req.url.includes('/api/user/logout') && req.method === 'POST') {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        // Enviar solicitud de log de cierre de sesión
        this.authService.logUserAction('logout', `Usuario ${currentUser.username} cerró sesión.`);
      }
    }

    return next.handle(req);
  }
}
