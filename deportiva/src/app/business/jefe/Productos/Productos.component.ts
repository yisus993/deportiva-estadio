// Otros imports necesarios y definiciones
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/services/product.model';
import { NotificationService } from '../../../core/services/notification.service';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-productos',
  templateUrl: './Productos.component.html',
  styleUrls: ['./Productos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive]
})
export class ProductosComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { id: '', name: '', quantity: 0, price: 0, status: 1 };
  selectedProduct: Product | null = null;
  showAddProductModal: boolean = false;
  showEditProductPanel: boolean = false;

  constructor(private productService: ProductService, private notificationService: NotificationService) {}


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    }, error => {
      console.error('Error al cargar productos:', error);
    });
  }

  addProduct(): void {
    // Validar que el campo nombre esté lleno
    if (!this.newProduct.name.trim()) {
      this.notificationService.showError('El nombre es obligatorio');
      return;
    }

    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = { id: '', name: '', quantity: 0, price: 0, status: 1 };
      this.closeAddProductModal();
      this.notificationService.showSuccess('¡Producto agregado con éxito!');
    }, error => {
      console.error('Error al agregar producto:', error);
      this.notificationService.showError('Error al agregar el producto');
    });
  }


  openEditProductPanel(product: Product): void {
    this.selectedProduct = { ...product };
    this.showEditProductPanel = true;
  }

  closeEditProductPanel(): void {
    this.showEditProductPanel = false;
  }

  updateProduct(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct.id!, this.selectedProduct).subscribe(() => {
        this.loadProducts();
        this.selectedProduct = null;
        this.closeEditProductPanel();
        this.notificationService.showSuccess('¡Producto actualizado con éxito!');
      }, error => {
        console.error('Error al actualizar producto:', error);
        this.notificationService.showError('Error al actualizar el producto');
      });
    }
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
      this.notificationService.showSuccess('¡Producto eliminado con éxito!');
    }, error => {
      console.error('Error al eliminar producto:', error);
      this.notificationService.showError('Error al eliminar el producto');
    });
  }

  filterProducts(): void {
    const input = (document.getElementById('searchInput') as HTMLInputElement).value.toUpperCase();
    const table = document.getElementById('productsTable') as HTMLTableElement;
    const tr = table.getElementsByTagName('tr');
    for (let i = 1; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName('td');
      let show = false;
      for (let j = 0; j < td.length; j++) {
        if (td[j]) {
          if (td[j].innerHTML.toUpperCase().indexOf(input) > -1) {
            show = true;
            break;
          }
        }
      }
      tr[i].style.display = show ? '' : 'none';
    }
  }

  openAddProductModal(): void {
    this.showAddProductModal = true;
  }

  closeAddProductModal(): void {
    this.showAddProductModal = false;
  }
}
