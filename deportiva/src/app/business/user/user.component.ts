import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/services/user.model';
import { NotificationService } from '../../core/services/notification.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  showDeleteConfirmModal = false;
  userToDelete: string | null = null;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    }, error => {
      console.error('Error al cargar usuarios:', error);
    });
  }

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AddUserModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  openEditUserModal(user: User): void {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  addUser(user: User): void {
    this.userService.addUser(user).subscribe(() => {
      this.loadUsers();
      this.notificationService.showSuccess('¡Usuario agregado con éxito!');
    }, error => {
      this.notificationService.handleError(error, 'Error al agregar el usuario');
    });
  }

  updateUser(id: string, user: User): void {
    this.userService.updateUser(id, user).subscribe(() => {
      this.selectedUser = null;
      this.loadUsers();
      this.notificationService.showSuccess('¡Usuario actualizado con éxito!');
    }, error => {
      this.notificationService.handleError(error, 'Error al actualizar el usuario');
    });
  }

  openDeleteConfirmModal(userId: string): void {
    this.userToDelete = userId;
    this.showDeleteConfirmModal = true;
  }

  closeDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = false;
    this.userToDelete = null;
  }

  confirmDeleteUser(): void {
    if (this.userToDelete !== null) {
      this.deleteUser(this.userToDelete);
      this.closeDeleteConfirmModal();
    }
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
      this.notificationService.showSuccess('¡Usuario eliminado con éxito!');
    }, error => {
      this.notificationService.handleError(error, 'Error al eliminar el usuario');
    });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
  }
}
