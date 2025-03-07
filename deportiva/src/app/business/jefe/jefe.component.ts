import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';

// Registrar todos los componentes necesarios de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-jefe',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './jefe.component.html',
  styleUrls: ['./jefe.component.css']
})
export class JefeComponent implements OnInit {
  barChart: any;
  productChart: any;
  clientChart: any;
  pieChart: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadBarChart();
    this.loadProductChart();
    this.loadClientChart();
    this.loadPieChart();
  }

  loadBarChart() {
    this.http.get('http://localhost:3025/api/ventas/obtenerVentasDiarias').subscribe((data: any) => {
      this.barChart = new Chart('barChart', {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Total ventas por día',
              data: data.totalVentas,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                maxTicksLimit: 10 // Limitar el número de ticks a 10
              }
            }
          }
        }
      });
    });
  }

  loadProductChart() {
    this.http.get('http://localhost:3025/api/ventas/obtenerProductosMasVendidos').subscribe((data: any) => {
      const top5Productos = data.labels ? data.labels.slice(0, 5) : []; // Top 5 productos
      const ventasTop5Productos = data.cantidadVendida ? data.cantidadVendida.slice(0, 5) : []; // Ventas de los top 5 productos

      this.productChart = new Chart('productChart', {
        type: 'bar',
        data: {
          labels: top5Productos, // Nombres de los productos
          datasets: [
            {
              label: 'Productos más Vendidos (Top 5)',
              data: ventasTop5Productos,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                maxTicksLimit: 10 // Limitar el número de ticks a 10
              }
            }
          }
        }
      });
    });
  }

  loadClientChart() {
    this.http.get('http://localhost:3025/api/clientes/obtenerClientesRegistradosDia').subscribe((data: any) => {
      this.clientChart = new Chart('clientChart', {
        type: 'line',
        data: {
          labels: data.fechas, // Fechas de los días
          datasets: [{
            label: 'Cantidad de Clientes Registrados por Día',
            data: data.cantidadClientes, // Cantidad de clientes registrados por día
            fill: false,
            borderColor: 'rgba(153, 102, 255, 1)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                maxTicksLimit: 10 // Limitar el número de ticks a 10
              }
            }
          }
        }
      });
    });
  }

  loadPieChart() {
    this.http.get('http://localhost:3025/api/ventas/obtenerMetodosPago').subscribe((data: any) => {
      this.pieChart = new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: data.metodos,
          datasets: [{
            data: data.cantidad,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    });
  }
}
