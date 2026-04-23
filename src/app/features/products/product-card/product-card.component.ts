import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() isAdmin = false;
  @Output() onDelete = new EventEmitter<number>();

  addedMsg = '';
  error = '';

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {}

  addToCart(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart({ productId: this.product.id_product, quantity: 1 }).subscribe({
      next: () => { this.addedMsg = '¡Agregado!'; setTimeout(() => this.addedMsg = '', 2000); },
      error: () => { this.error = 'Error al agregar'; setTimeout(() => this.error = '', 2000); }
    });
  }

  delete(): void {
    this.onDelete.emit(this.product.id_product);
  }
}
