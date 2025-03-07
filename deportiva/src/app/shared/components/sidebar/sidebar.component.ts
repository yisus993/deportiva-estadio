import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: string = ''; // Inicializamos user
  role: string = ''; // Inicializamos role

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser.username; // Actualizamos para coincidir con el payload del token
      this.role = currentUser.role;
    } else {
      console.error('No hay usuario autenticado.');
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
