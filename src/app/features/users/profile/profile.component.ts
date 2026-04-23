import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/cart-order.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  username = '';
  role = '';
  orders: Order[] = [];
  loading = false;
  error = '';

  constructor(private authService: AuthService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.role = this.authService.getRole();
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getMyOrders().subscribe({
      next: (orders: Order[]) => { this.orders = orders; this.loading = false; },
      error: () => { this.error = 'No se pudieron cargar las órdenes'; this.loading = false; }
    });
  }
}
