import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/services/user.model';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agregar CommonModule y FormsModule aquí
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent {
  selectedUser: User;

  constructor(
    public dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private notificationService: NotificationService // Inyectar NotificationService
  ) {
    this.selectedUser = { ...data };
  }

  onSubmit(): void {
    this.userService.updateUser(this.selectedUser.id!, this.selectedUser).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el modal y recargar la lista de usuarios
      this.notificationService.showSuccess('¡Usuario actualizado con éxito!');
    }, error => {
      console.error('Error al actualizar usuario:', error);
      this.notificationService.handleError(error, 'Error al actualizar el usuario');
    });
  }

  onClose(): void {
    this.dialogRef.close(false); // Cerrar el modal sin recargar la lista
  }
}
