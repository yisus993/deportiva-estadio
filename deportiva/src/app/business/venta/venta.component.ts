import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentasService } from '../../core/services/venta.service';
import { CustomerService } from '../../core/services/clientes.service';
import { Venta, ProductoVenta, Producto, Nota } from '../../core/services/venta.model';
import { Customer } from '../../core/services/clientes.model';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VentaComponent implements OnInit {
  venta: Venta = {
    productos: [],
    totalAmount: 0,
    customerId: '',
    iva: false,
    descuento: 0,
    metodoPago: 'Efectivo',
    pagaConEfectivo: 0,
    pagaConTarjeta: 0,
    pagaConTransferencia: 0,
    cambio: 0
  };
  productosDisponibles: Producto[] = [];
  clientesFiltrados: Customer[] = [];
  mostrarProductos: boolean = false;
  mostrarClientes: boolean = false;
  searchTerm: string = '';
  clienteTerm: string = '';
  mensaje: string = ''; // Para mostrar mensajes al usuario
  mensajeExito: string = ''; // Para mostrar mensajes de éxito
  notas: Nota[] = [];
  user: any;

  constructor(
    private ventaService: VentasService,
    private customerService: CustomerService,
    private notificationService: NotificationService,
    @Inject(AuthService) private authService: AuthService
  ) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerNotas();
  }

  isAdmin(): boolean {
    return this.user && this.user.role === 'Admin';
  }

  crearNota() {
    const nuevaNota: Nota = { titulo: '', contenido: '' };
    this.ventaService.crearNota(nuevaNota).subscribe(nuevaNota => {
      this.notas.push(nuevaNota);
    }, error => {
      this.notificationService.showError('Error al crear la nota');
    });
  }

  guardarNota(index: number) {
    const nota = this.notas[index];
    this.ventaService.actualizarNota(nota).subscribe(() => {
      this.notificationService.showSuccess('Nota guardada');
    }, error => {
      this.notificationService.showError('Error al guardar la nota');
    });
  }

  eliminarNota(index: number) {
    const nota = this.notas[index];
    this.ventaService.eliminarNota(nota.id!).subscribe(() => {
      this.notas.splice(index, 1);
      this.notificationService.showSuccess('Nota eliminada');
    }, error => {
      this.notificationService.showError('Error al eliminar la nota');
    });
  }

  obtenerNotas() {
    this.ventaService.obtenerNotas().subscribe(notas => {
      this.notas = notas;
    }, error => {
      this.notificationService.showError('Error al obtener las notas');
    });
  }

  obtenerProductos(): void {
    this.ventaService.obtenerProductos().subscribe((productos: Producto[]) => {
      this.productosDisponibles = productos;
    });
  }

  buscarCliente(): void {
    if (this.clienteTerm.trim() !== '') {
      this.customerService.searchClientes(this.clienteTerm).subscribe((clientes: Customer[]) => {
        this.clientesFiltrados = clientes;
        this.mostrarClientes = true;
      });
    } else {
      this.clientesFiltrados = [];
      this.mostrarClientes = false;
    }
  }

  seleccionarCliente(cliente: Customer): void {
    if (cliente.id) {
      this.venta.customerId = cliente.id.toString();
      this.clienteTerm = cliente.name;
      this.mostrarClientes = false;
    }
  }

  registrarVenta(): void {
    this.mensaje = ''; // Reinicia el mensaje
    this.mensajeExito = ''; // Reinicia el mensaje de éxito

    // Validar que haya un cliente seleccionado
    if (this.venta.customerId === '') {
      this.notificationService.showError('Tiene que seleccionar un cliente para realizar la venta');
      return;
    }

    // Validar que haya al menos un producto seleccionado
    if (this.venta.productos.length === 0) {
      this.notificationService.showError('Tiene que seleccionar al menos un producto para realizar la venta');
      return;
    }

    if (this.venta.cambio < 0) {
      this.notificationService.showError('Tienes que pagar el total para realizar la venta');
      return;
    }

    this.ventaService.registrarVenta(this.venta).subscribe({
      next: () => {
        this.notificationService.showSuccess('¡Venta realizada con éxito!');
        this.actualizarHistorial();
        this.actualizarInventario(); // Llamamos a la función para actualizar el inventario
        this.resetVenta();
      },
      error: (error: any) => {
        this.notificationService.showError(`Error al registrar la venta: ${error.error.message || error.message}`);
      }
    });
  }

  actualizarInventario(): void {
    this.venta.productos.forEach(productoVenta => {
      const productoActualizado = this.productosDisponibles.find(p => p.id === productoVenta.id);
      if (productoActualizado) {
        productoActualizado.quantity -= productoVenta.quantity;
        this.ventaService.actualizarProducto(productoActualizado).subscribe(() => {
          console.log(`Producto ${productoActualizado.name} actualizado correctamente`);
        }, (error: any) => {
          console.error(`Error al actualizar el producto ${productoActualizado.name}:`, error);
        });
      }
    });
  }

  resetVenta(): void {
    this.venta = {
      productos: [],
      totalAmount: 0,
      customerId: '',
      iva: false,
      descuento: 0,
      metodoPago: 'Efectivo',
      pagaConEfectivo: 0,
      pagaConTarjeta: 0,
      pagaConTransferencia: 0,
      cambio: 0
    };
    this.mensaje = ''; // Reinicia el mensaje
    this.mensajeExito = ''; // Reinicia el mensaje de éxito
  }

  agregarProducto(producto: Producto): void {
    if (producto.quantity <= 0) {
      this.notificationService.showError('No se puede seleccionar este producto, no hay cantidad disponible');
      return;
    }

    const nuevoProducto: ProductoVenta = { id: producto.id, name: producto.name, quantity: 1, price: producto.price };
    this.venta.productos.push(nuevoProducto);
    this.actualizarPrecioTotal();
    this.mostrarProductos = false;
  }

  eliminarProducto(index: number): void {
    this.venta.productos.splice(index, 1);
    this.actualizarPrecioTotal();
  }

  actualizarPrecioTotal(): void {
    let subtotal = this.venta.productos.reduce((total, producto) => total + (producto.quantity * producto.price), 0);

    if (this.venta.descuento > 0) {
      subtotal -= subtotal * (this.venta.descuento / 100);
    }

    if (this.venta.iva) { // Aplica IVA del 16% si corresponde
      subtotal *= 1.16;
    }

    this.venta.totalAmount = subtotal;
    this.actualizarCambio(); // Actualiza el cambio para todas las formas de pago
  }

  actualizarCambio(): void {
    const pagaConTotal = this.venta.pagaConEfectivo + this.venta.pagaConTarjeta + this.venta.pagaConTransferencia;
    this.venta.cambio = pagaConTotal - this.venta.totalAmount;
  }

  actualizarCambioEfectivo(): void {
    this.actualizarCambio();
  }

  actualizarCambioTarjeta(): void {
    this.actualizarCambio();
  }

  actualizarCambioTransferencia(): void {
    this.actualizarCambio();
  }

  filtrarProductos(): Producto[] {
    return this.productosDisponibles.filter(producto =>
      producto.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      producto.id.toString().includes(this.searchTerm)
    );
  }

  seleccionarProducto(producto: Producto): void {
    this.agregarProducto(producto);
  }

  toggleProductoSelection(): void {
    this.mostrarProductos = true;
  }

  cerrarBuscador(): void {
    this.mostrarProductos = false;
  }

  actualizarHistorial(): void {
    // Aquí puedes implementar la lógica para actualizar el historial de ventas
    // por ejemplo, haciendo una nueva solicitud al backend para obtener las ventas actualizadas
  }
}
