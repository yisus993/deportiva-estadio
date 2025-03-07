import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta, Producto, Nota } from './venta.model'; // Asegúrate de importar el modelo Nota

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrlVentas = 'http://localhost:3025/api/ventas';
  private apiUrlProductos = 'http://localhost:3025/api/product'; // URL base para productos
  private apiUrlNotas = 'http://localhost:3025/api/notas'; // URL base para notas

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  registrarVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(`${this.apiUrlVentas}/registrar`, venta, { headers: this.getAuthHeaders() });
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrlVentas}/getAllProducts`);
  }

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiUrlVentas}`);
  }

  // Nueva función para actualizar un producto
  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrlProductos}/${producto.id}`, producto, { headers: this.getAuthHeaders() });
  }

  // Funciones para gestionar las notas
  crearNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(`${this.apiUrlNotas}/crear`, nota, { headers: this.getAuthHeaders() });
  }

  actualizarNota(nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.apiUrlNotas}/${nota.id}`, nota, { headers: this.getAuthHeaders() });
  }

  eliminarNota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlNotas}/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.apiUrlNotas}`, { headers: this.getAuthHeaders() });
  }
}
