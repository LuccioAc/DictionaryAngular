import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Roles } from '../core/models/roles.enum';

interface TokenPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  exp: number;
  iss: string;
  aud: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(codeusr: string, passw: string): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/login', { codeusr, passw }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        // Ya no necesitas guardar rol separado, lo sacamos del token
      })
    );
  }

  register(nameusr: string, passw: string): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/register', { nameusr, passw });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.getTokenPayload();
    if (!payload) return false;

    const now = Date.now().valueOf() / 1000;
    if (payload.exp < now) {
      this.logout();
      return false;
    }
    return true;
  }

  getTokenPayload(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<TokenPayload>(token);
    } catch (error) {
      return null;
    }
  }

  getUserName(): string | null {
    const payload = this.getTokenPayload();
    return payload ? payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] : null;
  }

  getUserRole(): Roles | null {
    const payload = this.getTokenPayload();
    if (!payload) return null;

    const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (role === Roles.Admin) return Roles.Admin;
    if (role === Roles.User) return Roles.User;

    return null; // o puedes retornar Roles.User por default
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.put('/api/users/change-password', { currentPassword, newPassword });
  }
}
