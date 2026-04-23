import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginRequest, RegisterRequest, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User | null = null;
  private users: User[] = [];

  login(request: LoginRequest): Observable<User> {
    const user = this.users.find(u => u.email === request.email && u.userpassword === request.userpassword);
    if (user) {
      this.currentUser = user;
      return of(user);
    }
    return of({ id_user: 0, username: 'guest', email: request.email, userpassword: request.userpassword, status: 'guest', id_rol: 2, role: 'user' });
  }

  register(request: RegisterRequest): Observable<{ message: string }> {
    const newUser: User = {
      id_user: this.users.length + 1,
      username: request.username,
      email: request.email,
      userpassword: request.userpassword,
      status: 'active',
      id_rol: request.id_rol,
      role: request.id_rol === 1 ? 'admin' : 'user'
    };
    this.users.push(newUser);
    this.currentUser = newUser;
    return of({ message: 'Registro exitoso' });
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  getUsername(): string {
    return this.currentUser?.username ?? '';
  }

  getRole(): string {
    return this.currentUser?.role ?? 'user';
  }

  logout(): void {
    this.currentUser = null;
  }
}
