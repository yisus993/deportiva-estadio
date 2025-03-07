import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { UsersComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // Agregar FormsModule aquí
    HttpClientModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UserModule { }
