import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ResetPasswordComponent implements OnInit {
  newPassword: string = ''; // Inicializar la variable
  confirmPassword: string = ''; // Inicializar la variable
  message: string = ''; // Inicializar la variable
  token: string = ''; // Inicializar la variable

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || ''; // Asegurarse de que la variable token sea un string
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      response => {
        // Verifica el mensaje de respuesta del servidor
        if (response.message === 'Contraseña actualizada exitosamente') {
          this.message = 'Contraseña actualizada exitosamente';
        } else {
          this.message = 'Error al actualizar la contraseña';
        }
      },
      error => this.message = 'Error al actualizar la contraseña'
    );
  }
}
