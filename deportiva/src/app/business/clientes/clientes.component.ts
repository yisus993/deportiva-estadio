import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from '../../core/services/clientes.service';
import { Customer } from '../../core/services/clientes.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class ClientesComponent implements OnInit {
  clients: Customer[] = [];
  newClient: Customer = {
    name: '',
    phone: '',
    email: '',
    rfc: '',
    uso_cfdi: '',
    regimen_fiscal: '',
    codigo_postal: ''
  };
  selectedClient: Customer | null = null;
  showAddClientModal: boolean = false;
  showDeleteConfirmModal = false;
  clientToDelete: number | null = null;

  constructor(
    private customerService: CustomerService,
    private notificationService: NotificationService // Inyectar NotificationService
  ) {}


  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.customerService.getCustomers().subscribe((clients) => {
      this.clients = clients;
    });
  }

  openAddClientModal(): void {
    this.showAddClientModal = true;
  }

  closeAddClientModal(): void {
    this.showAddClientModal = false;
    this.newClient = {
      name: '',
      phone: '',
      email: '',
      rfc: '',
      uso_cfdi: '',
      regimen_fiscal: '',
      codigo_postal: ''
    };
  }

  addClient(): void {
    // Validar campos obligatorios
    if (!this.newClient.name || !this.newClient.phone || !this.newClient.email) {
      if (!this.newClient.name) {
        this.notificationService.showError('El nombre es obligatorio');
      }
      if (!this.newClient.phone) {
        this.notificationService.showError('El teléfono es obligatorio');
      }
      if (!this.newClient.email) {
        this.notificationService.showError('El correo electrónico es obligatorio');
      }
      return;
    }

    // Si todos los campos obligatorios están llenos, proceder con la solicitud
    this.customerService.addCustomer(this.newClient).subscribe(() => {
      this.loadClients();
      this.closeAddClientModal();
      this.notificationService.showSuccess('¡Cliente agregado con éxito!');
    }, error => {
      console.error('Error al agregar cliente:', error);
      this.notificationService.handleError(error, 'Error al agregar el cliente');
    });
  }

  editClient(client: Customer): void {
    this.selectedClient = { ...client };
  }

  updateClient(): void {
    if (this.selectedClient) {
      this.customerService.updateCustomer(this.selectedClient).subscribe(() => {
        this.loadClients();
        this.selectedClient = null;
        this.notificationService.showSuccess('¡Cliente actualizado con éxito!');
      }, error => {
        console.error('Error al actualizar cliente:', error);
        this.notificationService.handleError(error, 'Error al actualizar el cliente');
      });
    }
  }

  openDeleteConfirmModal(clientId: number): void {
    this.clientToDelete = clientId;
    this.showDeleteConfirmModal = true;
  }

  closeDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = false;
    this.clientToDelete = null;
  }

  confirmDeleteClient(): void {
    if (this.clientToDelete !== null) {
      this.deleteClient(this.clientToDelete);
      this.closeDeleteConfirmModal();
    }
  }

  deleteClient(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.loadClients();
      this.notificationService.showSuccess('¡Cliente eliminado con éxito!');
    }, error => {
      console.error('Error al eliminar cliente:', error);
      this.notificationService.handleError(error, 'Error al eliminar el cliente');
    });
  }

  filterClients(): void {
    const input = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    this.clients = this.clients.filter(client =>
      client.name.toLowerCase().includes(input) ||
      client.phone.toLowerCase().includes(input) ||
      client.email.toLowerCase().includes(input) ||
      client.rfc.toLowerCase().includes(input) ||
      client.uso_cfdi.toLowerCase().includes(input) ||
      client.regimen_fiscal.toLowerCase().includes(input) ||
      client.codigo_postal.toLowerCase().includes(input)
    );
  }
}
