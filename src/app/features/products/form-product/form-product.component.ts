import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ProductRequest } from '../../../models/product.model';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit {
  form: ProductRequest = { productname: '', productdescription: '', price: 0 };
  isEdit = false;
  productId: number | null = null;
  loading = false;
  error = '';
  successMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService:  ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productId = Number(id);
      this.productService.getProductById(this.productId).subscribe({
        next: (p: any) => {
          this.form = {
            productname: p.productname,
            productdescription: p.productdescription,
            price: p.price
          };
        },
        error: () => { this.error = 'No se pudo cargar el producto'; }
      });
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    const request = this.isEdit
      ? this.productService.updateProduct(this.productId!, this.form)
      : this.productService.createProduct(this.form);

    request.subscribe({
      next: (res: { message: string; }) => {
        this.loading = false;
        this.successMsg = res.message;
        setTimeout(() => this.router.navigate(['/products']), 1500);
      },
      error: (err: { error: { message: string; }; }) => {
        this.loading = false;
        this.error = err?.error?.message || 'Error al guardar el producto';
      }
    });
  }
}
