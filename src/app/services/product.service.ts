import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, ProductRequest } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    { id_product: 1, productname: 'Producto demo', productdescription: 'Descripción de ejemplo', price: 0, stock: 0, status: true }
  ];

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product> {
    const product = this.products.find(p => p.id_product === id) || {
      id_product: id,
      productname: '',
      productdescription: '',
      price: 0,
      stock: 0,
      status: false
    };
    return of(product);
  }

  createProduct(request: ProductRequest): Observable<{ message: string }> {
    const newProduct: Product = {
      id_product: this.products.length + 1,
      productname: request.productname,
      productdescription: request.productdescription ?? '',
      price: request.price,
      stock: 0,
      status: true
    };
    this.products.push(newProduct);
    return of({ message: 'Producto creado correctamente' });
  }

  updateProduct(id: number, request: ProductRequest): Observable<{ message: string }> {
    const product = this.products.find(p => p.id_product === id);
    if (product) {
      product.productname = request.productname;
      product.productdescription = request.productdescription ?? product.productdescription;
      product.price = request.price;
    }
    return of({ message: 'Producto actualizado correctamente' });
  }

  deleteProduct(id: number): Observable<{ message: string }> {
    this.products = this.products.filter(p => p.id_product !== id);
    return of({ message: 'Producto eliminado correctamente' });
  }
}
