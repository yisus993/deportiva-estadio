import { Component, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { VentasService } from '../../../core/services/venta.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
  imports: [RouterLink, RouterLinkActive]
})
export class HistorialComponent implements OnInit {
  ventasRealizadas: any[] = [];
  productos: any[] = [];
  usuariosRegistrados: any[] = [];

  constructor(private ventasService: VentasService, private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerVentas();
    this.obtenerProductos();
    this.obtenerUsuarios();
  }

  obtenerVentas(): void {
    this.http.get<any[]>('http://localhost:3025/api/ventas/ultimos-30-dias').subscribe({
      next: (data) => {
        this.ventasRealizadas = data;
      },
      error: (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    });
}


obtenerProductos(): void {
    this.http.get<any[]>('http://localhost:3025/api/product/getAllProducts').subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });
}

obtenerUsuarios(): void {
    this.http.get<any[]>('http://localhost:3025/api/clients').subscribe({
      next: (data) => {
        this.usuariosRegistrados = data;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    });
}



  exportarVentasRealizadas() {
    this.exportarAExcel(this.ventasRealizadas, 'VentasRealizadas');
  }

  exportarProductos() {
    this.exportarAExcel(this.productos, 'Productos');
  }

  exportarUsuariosRegistrados() {
    this.exportarAExcel(this.usuariosRegistrados, 'UsuariosRegistrados');
  }

  private async exportarAExcel(data: any[], fileName: string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }));

    data.forEach(item => {
      worksheet.addRow(item);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    this.saveAsExcelFile(buffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
