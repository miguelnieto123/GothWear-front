import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/cart-order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: Order[] = [];

  getAllOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getMyOrders(): Observable<Order[]> {
    return of(this.orders);
  }
}
