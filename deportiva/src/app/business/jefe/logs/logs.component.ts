import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { LogService } from '../../../core/services/log.service';
import { Log } from '../../../core/services/log.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxPaginationModule, RouterLink],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LogsComponent implements OnInit {
  page: number = 1; // Página actual
  pageSize: number = 10; // Cantidad de elementos por página
  totalItems: number = 0; // Total de elementos
  logs: Log[] = [];
  filteredLogs: { [key: string]: Log[] } = {
    usuarios: [],
    productos: [],
    clientes: [],
    ventas: []
  };

  logType: string = 'usuarios';
  linesPerPage: number = 10;
  currentPage: { [key: string]: number } = {
    usuarios: 1,
    productos: 1,
    clientes: 1,
    ventas: 1
  };
  sortOrder: string = 'desc';

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.loadLogs();
    this.cargarLogs();
  }

  loadLogs(): void {
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.filterLogs();
    }, error => {
      console.error('Error al cargar los logs:', error);
    });
  }

  filterLogs(): void {
    this.filteredLogs['usuarios'] = this.logs.filter(log =>
      log.action.includes('Usuario') ||
      log.action.includes('login') ||
      log.action.includes('logout') ||
      log.action.includes('register')
    );
    this.filteredLogs['productos'] = this.logs.filter(log => log.action.includes('Producto'));
    this.filteredLogs['clientes'] = this.logs.filter(log => log.action.includes('Cliente'));
    this.filteredLogs['ventas'] = this.logs.filter(log => log.action.includes('Venta'));
  }

  applyFilter(logType: string, event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredLogs[logType] = this.logs.filter(log =>
      log.user.toLowerCase().includes(filterValue) ||
      log.action.toLowerCase().includes(filterValue) ||
      log.details.toLowerCase().includes(filterValue)
    );
  }

  updateLogType(event: Event): void {
    this.logType = (event.target as HTMLSelectElement).value;
  }

  updateLinesPerPage(event: Event): void {
    this.linesPerPage = +(event.target as HTMLSelectElement).value;
  }

  changePage(event: number): void {
    this.currentPage[this.logType] = event;
  }

  reloadOptions(): void {
    this.loadLogs();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.updateSortOrder(this.sortOrder);
  }

  updateSortOrder(order: string): void {
    this.sortOrder = order;
  }

  cargarLogs() {
    // Simulación de carga de datos, reemplázalo con una API
    this.logs = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      mensaje: `Log ${i + 1}`,
      user: `User ${i + 1}`, // Asegúrate de incluir todas las propiedades
      action: `Action ${i + 1}`, // Asegúrate de incluir todas las propiedades
      timestamp: new Date(), // Cambia de string a Date
      details: `Details ${i + 1}` // Asegúrate de incluir todas las propiedades
    }));
    this.totalItems = this.logs.length;
  }

  sortedLogs(logs: Log[]): Log[] {
    return logs.sort((a, b) => {
      return this.sortOrder === 'asc'
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }
}
