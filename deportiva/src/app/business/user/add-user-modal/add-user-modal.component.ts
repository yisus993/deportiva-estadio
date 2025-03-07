import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/services/user.model';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [FormsModule], // Agregar FormsModule aquí
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  newUser: User = {
    name: '',
    lastname: '',
    user: '',
    email: '', // Inicializar el campo de correo electrónico
    password: '',
    role: 'Vendedor',
    status: 1
  };

  constructor(
    public dialogRef: MatDialogRef<AddUserModalComponent>,
    private userService: UserService,
    private notificationService: NotificationService // Inyectar NotificationService
  ) {}


  onSubmit(): void {
    this.userService.addUser(this.newUser).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el modal y recargar la lista de usuarios
      this.notificationService.showSuccess('¡Usuario agregado con éxito!');
    }, error => {
      console.error('Error al agregar usuario:', error);
      this.notificationService.handleError(error, 'Error al agregar el usuario');
    });
  }


  onClose(): void {
    this.dialogRef.close(false); // Cerrar el modal sin recargar la lista
  }
}
