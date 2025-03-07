export interface Producto {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ProductoVenta {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Venta {
  productos: ProductoVenta[];
  totalAmount: number;
  customerId: string;
  iva: boolean;
  descuento: number;
  metodoPago: string;
  pagaConEfectivo: number;
  pagaConTarjeta: number;
  pagaConTransferencia: number;
  cambio: number;
}

export interface Nota {
  id?: number;
  titulo: string;
  contenido: string;
}
