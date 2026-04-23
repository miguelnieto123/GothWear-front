import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/cart-order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cart: Cart | null = null;
  loading = false;
  processing = false;
  error = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (c: any) => { this.cart = c; this.loading = false; },
      error: () => { this.error = 'Error al cargar el carrito'; this.loading = false; }
    });
  }

  get total(): number {
    if (!this.cart?.items) return 0;
    return this.cart.items.reduce((s: number, i: { price: number; quantity: number; }) => s + (i.price * i.quantity), 0);
  }

  confirmPurchase(): void {
    this.processing = true;
    this.cartService.checkout().subscribe({
      next: () => { this.processing = false; this.router.navigate(['/orders/summary']); },
      error: () => { this.processing = false; this.error = 'Error al confirmar la compra'; }
    });
  }
}
