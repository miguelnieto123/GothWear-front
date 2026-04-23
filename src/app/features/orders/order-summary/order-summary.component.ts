import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { Order } from '../../../models/cart-order.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  error = '';
  isAdmin = false;

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loading = true;
    const request = this.isAdmin
      ? this.orderService.getAllOrders()
      : this.orderService.getMyOrders();

    request.subscribe({
      next: (orders: Order[]) => { this.orders = orders; this.loading = false; },
      error: () => { this.error = 'Error al cargar órdenes'; this.loading = false; }
    });
  }
}
