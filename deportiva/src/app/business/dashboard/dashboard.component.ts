import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Indica que este componente es autónomo
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Cambié de 'styleUrl' a 'styleUrls'
})
export class DashboardComponent { // Cambié `default` a `export class`
}
