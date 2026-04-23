import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cart, CartItem } from '../models/cart-order.model';

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: Cart = { items: [] };

  getCart(): Observable<Cart> {
    return of(this.cart);
  }

  addToCart(request: AddToCartRequest): Observable<{ message: string }> {
    const existingItem = this.cart.items.find(item => item.id_product === request.productId);
    if (existingItem) {
      existingItem.quantity += request.quantity;
    } else {
      this.cart.items.push({ id_product: request.productId, productname: '', price: 0, quantity: request.quantity });
    }

    return of({ message: 'Producto agregado al carrito' });
  }

  removeFromCart(productId: number): Observable<void> {
    this.cart.items = this.cart.items.filter(item => item.id_product !== productId);
    return of(void 0);
  }

  checkout(): Observable<{ message: string }> {
    this.cart.items = [];
    return of({ message: 'Compra procesada con éxito' });
  }
}
