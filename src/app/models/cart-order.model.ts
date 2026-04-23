export interface CartItem {
  id_product: number;
  productname: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface Order {
  id_order: number;
  orderdate: Date;
  items: CartItem[];
  amount: number;
  total: number;
  status: string;
  createdAt: Date;
}
