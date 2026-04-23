export interface ProductModule {
  id_product: number;
  productname: string;
  productdescription?: string;
  price: number;
  stock: number;
  status: boolean;
}
