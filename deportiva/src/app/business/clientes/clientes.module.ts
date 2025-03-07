import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes.component';

@NgModule({
  declarations: [ClientesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule // Importar FormsModule aquí
  ]
})
export class ClientesModule { }
