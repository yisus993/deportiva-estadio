import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentaComponent } from './venta.component';
import { VentasService } from '../../core/services/venta.service';
import { CustomerService } from '../../core/services/clientes.service';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';
import { Venta, Nota, Producto } from '../../core/services/venta.model';

describe('VentaComponent', () => {
  let component: VentaComponent;
  let fixture: ComponentFixture<VentaComponent>;
  let ventasServiceStub: Partial<VentasService>;
  let customerServiceStub: Partial<CustomerService>;
  let notificationServiceStub: Partial<NotificationService>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    ventasServiceStub = {
      obtenerProductos: () => of([]),
      registrarVenta: (venta: Venta) => of(venta),
      crearNota: (nota: Nota) => of(nota),
      actualizarNota: (nota: Nota) => of(nota),
      eliminarNota: (id: number) => of(null),
      obtenerNotas: () => of([]),
      actualizarProducto: (producto: Producto) => of(producto)
    };

    customerServiceStub = {
      searchClientes: () => of([])
    };

    notificationServiceStub = {
      showSuccess: () => {},
      showError: () => {},
      handleError: () => {}
    };

    authServiceStub = {
      getCurrentUser: () => ({ id: '1', username: 'testuser', role: 'Admin' })
    };

    await TestBed.configureTestingModule({
      imports: [VentaComponent],
      providers: [
        { provide: VentasService, useValue: ventasServiceStub },
        { provide: CustomerService, useValue: customerServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: AuthService, useValue: authServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Puedes agregar más pruebas aquí según sea necesario
});
