export interface CartItem {
  id_product: number;
  name?: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status?: string;
  createdAt?: string;
}
