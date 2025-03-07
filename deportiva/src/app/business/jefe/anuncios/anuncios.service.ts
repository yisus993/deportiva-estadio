import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  private apiUrl = 'http://localhost:3025/api/anuncios'; // Cambia esto según tu configuración

  constructor(private http: HttpClient) {}

  crearAnuncio(titulo: string, contenido: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, { titulo, contenido });
  }

  enviarAnuncio(anuncioId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar`, { anuncioId });
  }

  obtenerAnunciosEnviados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/enviados`);
  }
}
