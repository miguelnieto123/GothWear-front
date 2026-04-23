import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest } from '../models/user.model';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, request).pipe(
    tap((response: any) => {


      localStorage.setItem('token', response.jwt);

      // opcional (si quieres manejar usuario)
      localStorage.setItem('user', JSON.stringify({
      username: request.username,
       role: 'user' // temporal
}));

      console.log('LOGIN OK:', response);
    })
  );
}

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerUsers`, request);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user?.username || '';
}

  getRole(): string {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user?.role || 'user';
}

 isAdmin(): boolean {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user?.role === 'admin';
}
}
