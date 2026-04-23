export interface Product {
  id_product: number;
  productname: string;
  productdescription?: string;
  price: number;
  stock?: number;
  status?: boolean;
}

export interface ProductRequest {
  productname: string;
  productdescription?: string;
  price: number;
}
