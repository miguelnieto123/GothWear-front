import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  username = '';
  cartCount = 0;
  menuOpen = false;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.refresh();
    this.router.events.subscribe(() => this.refresh());
  }

  refresh(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
    this.username = this.authService.getUsername() || '';
    if (this.isLoggedIn && !this.isAdmin) this.loadCartCount();
  }

  loadCartCount(): void {
    this.cartService.getCart().subscribe({
      next: (cart: { items: string | any[]; }) => { this.cartCount = cart?.items?.length ?? 0; },
      error: () => { this.cartCount = 0; }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
