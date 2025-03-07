import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: string = '';
  password: string = '';
  errorMessage: string = ''; // Nueva variable para el mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.user, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); // Guarda el token en el local storage
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login Failed', err);
        if (err.error && typeof err.error === 'string') {
          if (err.error === 'Usuario no encontrado' || err.error === 'Contraseña incorrecta') {
            this.errorMessage = 'El usuario o la contraseña es incorrecta';
          } else if (err.error === 'Estado inactivo') {
            this.errorMessage = 'Tu estado está inactivo';
          } else {
            this.errorMessage = 'Se ha producido un error al iniciar sesión';
          }
        } else {
          this.errorMessage = 'El Usuario o la Contraseña es incorrecta';
        }
      }
    });
  }
}
