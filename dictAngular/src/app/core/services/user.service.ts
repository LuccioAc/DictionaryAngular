import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/Usuarios`;  // URL base de la API desde environment

  constructor(private http: HttpClient) {}

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, user);  // Endpoint para actualizar el usuario
  }
}
