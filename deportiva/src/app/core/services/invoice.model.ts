import { Customer } from './clientes.model';

export interface Invoice {
  id?: number;
  clientId: number;
  client?: Customer;
  amount: number;
  description: string;
  items: { productId: number; productCost: number, quantity: number }[];
}
