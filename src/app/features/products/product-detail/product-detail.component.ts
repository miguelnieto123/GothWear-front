import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { Product } from '../../../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  form!: FormGroup;
  loading = false;
  error = '';
  successMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    // ✅ Formulario reactivo
    this.form = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]]
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;

    this.productService.getProductById(id).subscribe({
      next: (p: any) => {
        this.product = p;
        this.loading = false;
      },
      error: () => {
        this.error = 'Producto no encontrado';
        this.loading = false;
      }
    });
  }

  addToCart(): void {

    if (this.form.invalid) return;

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.product) return;

    const quantity = this.form.value.quantity;

    this.cartService.addToCart({
      productId: this.product.id_product,
      quantity: quantity
    }).subscribe({
      next: (res: { message: string }) => {
        this.successMsg = res.message;
      },
      error: () => {
        this.error = 'Error al agregar al carrito';
      }
    });
  }
}
