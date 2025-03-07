import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule si usas [(ngModel)]
import { UserModule } from './business/user/user.module';
import { ClientesModule } from './business/clientes/clientes.module';
import { AuthenticationModule } from './business/authentication/authentication.module'; // Importa el módulo de autenticación
import { CustomerService } from './core/services/clientes.service'; // Importa el servicio de clientes
import { InvoiceService } from './core/services/invoice.service'; // Importa el servicio de facturas

// Importa componentes standalone directamente
import { AppComponent } from './app.component';
import { VentaComponent } from './business/venta/venta.component';
import { HistorialComponent } from './business/historial/historial.component';

const routes: Routes = [
  { path: '', redirectTo: '/venta', pathMatch: 'full' },
  { path: 'venta', component: VentaComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'logs', loadComponent: () => import('./business/jefe/logs/logs.component').then(m => m.LogsComponent) }, // Añade la ruta para el componente de logs
  { path: 'invoice', loadComponent: () => import('./business/jefe/invoice/invoice.component').then(m => m.InvoiceComponent) } // Carga lazy del componente de factura
  // Otras rutas...
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    UserModule,
    ClientesModule,
    CommonModule, // Asegúrate de importar CommonModule
    AuthenticationModule, // Asegúrate de que este módulo esté importado
    HttpClientModule, // Asegúrate de importar HttpClientModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [CustomerService, InvoiceService], // Añade los servicios en providers
  bootstrap: [AppComponent] // Usa bootstrapApplication en main.ts si es standalone
})
export class AppModule { }
