import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AnunciosService } from './anuncios.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-anuncios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterLinkActive],
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css'],
  providers: [AnunciosService, NotificationService]
})
export class AnunciosComponent implements OnInit {
  anunciosForm: FormGroup;
  anunciosEnviados: any[] = []; // Registro de anuncios enviados

  constructor(
    private fb: FormBuilder,
    @Inject(AnunciosService) private anunciosService: AnunciosService,
    private notificationService: NotificationService
  ) {
    this.anunciosForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerAnunciosEnviados();
  }

  crearAnuncio() {
    if (this.anunciosForm.invalid) {
      this.notificationService.showError('Todos los campos son obligatorios.');
      return;
    }

    const { titulo, contenido } = this.anunciosForm.value;
    this.anunciosService.crearAnuncio(titulo, contenido).subscribe(
      (response: any) => {
        this.notificationService.showSuccess(response.message); // Mostrar mensaje de éxito
        this.obtenerAnunciosEnviados(); // Actualizar la lista de anuncios enviados
      },
      (error: any) => {
        this.notificationService.handleError(error, 'Error al crear anuncio.'); // Manejar el error y mostrar mensaje
      }
    );
  }

  enviarAnuncio(anuncioId: number) {
    this.anunciosService.enviarAnuncio(anuncioId).subscribe(
      (response: any) => {
        this.anunciosEnviados.push({ anuncioId, status: 'Enviado' });
        this.notificationService.showSuccess('Anuncio enviado exitosamente.'); // Mostrar mensaje de éxito
      },
      (error: any) => {
        this.notificationService.handleError(error, 'Error al enviar anuncio.'); // Manejar el error y mostrar mensaje
        this.anunciosEnviados.push({ anuncioId, status: 'Error' });
      }
    );
  }

  obtenerAnunciosEnviados() {
    this.anunciosService.obtenerAnunciosEnviados().subscribe(
      (response: any) => {
        this.anunciosEnviados = response;
      },
      (error: any) => {
        this.notificationService.handleError(error, 'Error al obtener anuncios enviados.'); // Manejar el error y mostrar mensaje
      }
    );
  }
}
