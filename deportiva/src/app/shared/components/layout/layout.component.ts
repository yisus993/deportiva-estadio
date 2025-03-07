import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true, // Indica que este componente es autónomo
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'] // Cambié de 'styleUrl' a 'styleUrls'
})
export class LayoutComponent { // Cambié `default` a `export class`
}
