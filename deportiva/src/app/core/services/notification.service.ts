import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top'
    });
  }

  showError(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top'
    });
  }

  handleError(error: any, defaultMessage: string = 'Error inesperado'): void {
    const errorMessage = error.error?.message || error.message || defaultMessage;
    this.showError(errorMessage);
  }
}
