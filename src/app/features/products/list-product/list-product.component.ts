import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  isAdmin = false;
  successMsg = '';

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (p: Product[]) => {
        this.products = p;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar productos';
        this.loading = false;
      }
    });
  }

  deleteProduct(id: number): void {
    if (!confirm('¿Eliminar este producto?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: (res: { message: string }) => {
        this.successMsg = res.message;
        this.loadProducts();
      },
      error: () => {
        this.error = 'Error al eliminar el producto';
      }
    });
  }

  // ✅ ESTE ES EL MÉTODO QUE TE FALTABA
  trackByProductId(index: number, product: Product): number {
    return product.id_product;
  }
}
