import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { ForgotPasswordComponent } from './business/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './business/authentication/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'venta',
        loadComponent: () => import('./business/venta/venta.component').then(m => m.VentaComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'Productos',
        loadComponent: () => import('./business/jefe/Productos/Productos.component').then(m => m.ProductosComponent),
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'clientes',
        loadComponent: () => import('./business/clientes/clientes.component').then(m => m.ClientesComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        loadComponent: () => import('./business/user/user.component').then(m => m.UsersComponent),
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'jefe',
        loadComponent: () => import('./business/jefe/jefe.component').then(m => m.JefeComponent),
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'invoice',
        loadComponent: () => import('./business/jefe/invoice/invoice.component').then(m => m.InvoiceComponent),
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'logs',
        loadComponent: () => import('./business/jefe/logs/logs.component').then(m => m.LogsComponent),
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'anuncios',
        loadComponent: () => import('./business/jefe/anuncios/anuncios.component').then(m => m.AnunciosComponent),
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordComponent
      },
      {
        path: '',
        redirectTo: 'venta',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./business/authentication/login/login.component').then(m => m.LoginComponent),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '**',
    redirectTo: 'venta',
  }
];
