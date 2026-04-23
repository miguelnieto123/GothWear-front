import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/cart-order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  loading = false;
  error = '';
  successMsg = '';
  checkingOut = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (c: any) => { this.cart = c; this.loading = false; },
      error: () => { this.error = 'Error al cargar el carrito'; this.loading = false; }
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => this.loadCart(),
      error: () => { this.error = 'Error al eliminar el producto'; }
    });
  }

  get total(): number {
    if (!this.cart?.items) return 0;
    return this.cart.items.reduce((sum: number, item: { price: number; quantity: number; }) => sum + (item.price * item.quantity), 0);
  }

  checkout(): void {
    this.checkingOut = true;
    this.cartService.checkout().subscribe({
      next: (res: { message: string; }) => {
        this.checkingOut = false;
        this.successMsg = res.message;
        this.cart = null;
        setTimeout(() => this.router.navigate(['/orders/summary']), 1500);
      },
      error: () => {
        this.checkingOut = false;
        this.error = 'Error al procesar la compra';
      }
    });
  }
}
