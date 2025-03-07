import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { InvoiceComponent } from './invoice.component';
import { InvoiceService } from '../../../core/services/invoice.service';
import { CustomerService } from '../../../core/services/clientes.service';
import { ProductService } from '../../../core/services/product.service';
import { NotificationService } from '../../../core/services/notification.service';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Módulo de pruebas para HttpClient
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule, // Módulo de pruebas para Router
        InvoiceComponent // Importa el componente standalone
      ],
      providers: [
        InvoiceService,
        CustomerService,
        ProductService,
        NotificationService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
