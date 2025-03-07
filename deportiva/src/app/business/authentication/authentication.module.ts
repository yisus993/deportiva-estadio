import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoginComponent, // Importa el componente autónomo
    ForgotPasswordComponent, // Importa el componente autónomo
    ResetPasswordComponent // Importa el componente autónomo
  ]
})
export class AuthenticationModule { }
