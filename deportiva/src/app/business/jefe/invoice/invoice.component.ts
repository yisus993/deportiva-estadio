import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { InvoiceService } from '../../../core/services/invoice.service';
import { CustomerService } from '../../../core/services/clientes.service';
import { ProductService } from '../../../core/services/product.service';
import { Invoice } from '../../../core/services/invoice.model';
import { Customer } from '../../../core/services/clientes.model';
import { Product } from '../../../core/services/product.model';
import { NotificationService } from '../../../core/services/notification.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive]
})
export class InvoiceComponent implements OnInit {
  invoices: Invoice[] = [];
  customers: Customer[] = [];
  filteredClients: Customer[] = [];
  products: Product[] = [];
  newInvoice: Invoice = { clientId: 0, amount: 0, description: '', items: [] };
  clientName: string = '';
  showAddInvoiceModal: boolean = false;
  showInvoiceDetailsModal: boolean = false;
  invoiceForm: FormGroup;
  total: number = 0;
  selectedInvoice: Invoice & { client?: Customer } | null = null;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {
    this.invoiceForm = this.fb.group({
      cliente: [''],
      descripcion: [''],
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadInvoices();
    this.loadCustomers();
    this.loadProducts();
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.fb.group({
      productId: [''],
      quantity: [1]
    }));
    this.calculateTotal();
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.calculateTotal();
  }

  calculateTotal(): void {
    let totalSinIva = this.items.controls.reduce((acc, item) => {
      const productId = item.value.productId;
      const product = this.products.find(p => p.id == productId);
      if (product) {
        const itemTotal = product.price * item.value.quantity;
        return acc + itemTotal;
      } else {
        return acc;
      }
    }, 0);

    this.total = totalSinIva;
  }

  getProductById(productId: number): Product | undefined {
    return this.products.find(p => p.id === productId.toString());
}



  loadInvoices(): void {
    this.invoiceService.getInvoices().subscribe((invoices) => {
      this.invoices = invoices;
    });
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  filterClients(): void {
    const clienteValue = this.invoiceForm.get('cliente')?.value || '';
    this.filteredClients = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(clienteValue.toLowerCase())
    );
  }

  selectClient(customer: Customer): void {
    this.newInvoice.clientId = customer.id!;
    this.clientName = customer.name;
    this.invoiceForm.get('cliente')?.setValue(customer.name);
    this.filteredClients = [];
  }

  openAddInvoiceModal(): void {
    this.showAddInvoiceModal = true;
    this.invoiceForm.reset();
    this.items.clear();
    this.addItem();
  }

  closeAddInvoiceModal(): void {
    this.showAddInvoiceModal = false;
    this.invoiceForm.reset();
    this.total = 0;
  }

  addInvoice(): void {
    if (this.invoiceForm.valid) {
      const itemsWithNames = this.items.value.map((item: any) => {
        const product = this.getProductById(item.productId);
        return {
          productId: item.productId,
          productName: product ? product.name : 'Producto no encontrado',
          quantity: item.quantity
        };
      });

      const invoiceData = {
        clientId: this.newInvoice.clientId,
        amount: this.total,
        description: this.invoiceForm.get('descripcion')?.value,
        items: itemsWithNames
      };

      this.invoiceService.createInvoice(invoiceData).subscribe(() => {
        this.loadInvoices();
        this.closeAddInvoiceModal();
        this.notificationService.showSuccess('¡Factura creada con éxito!');
      }, error => {
        console.error('Error al crear la factura:', error);
        this.notificationService.handleError(error, 'Error al crear la factura');
      });
    }
  }

  deleteInvoice(id: number): void {
    this.invoiceService.deleteInvoice(id).subscribe(() => {
      this.loadInvoices();
      this.notificationService.showSuccess('¡Factura eliminada con éxito!');
    }, error => {
      console.error('Error al eliminar la factura:', error);
      this.notificationService.handleError(error, 'Error al eliminar la factura');
    });
  }

  getCustomerName(clientId: number): string {
    const customer = this.customers.find(c => c.id === clientId);
    return customer ? customer.name : 'Cliente no encontrado';
  }

  viewInvoiceDetails(id: number): void {
    this.selectedInvoice = this.invoices.find(invoice => invoice.id === id) || null;
    if (this.selectedInvoice) {
      this.selectedInvoice.client = this.customers.find(customer => customer.id === this.selectedInvoice!.clientId);
      this.showInvoiceDetailsModal = true;
    }
  }

  closeInvoiceDetailsModal(): void {
    this.showInvoiceDetailsModal = false;
    this.selectedInvoice = null;
  }
}
