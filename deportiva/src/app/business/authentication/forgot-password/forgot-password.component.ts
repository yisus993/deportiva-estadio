import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Añade CommonModule y FormsModule a las importaciones
})
export class ForgotPasswordComponent {
  email: string = ''; // Inicializar la variable
  message: string = ''; // Inicializar la variable

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe(
      response => {
        // Verifica el mensaje de respuesta del servidor
        if (response.message === 'Correo de recuperación enviado') {
          this.message = 'Correo enviado correctamente';
        } else {
          this.message = 'Error al enviar el correo de recuperación';
        }
      },
      error => this.message = 'Error al enviar el correo de recuperación'
    );
  }
}
