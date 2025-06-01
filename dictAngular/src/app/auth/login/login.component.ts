import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  codeusr = '';
  passw = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router, private ui: UiService) {}

  login() {
    this.loading = true;
    this.auth.login(this.codeusr, this.passw).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.token) {
          this.ui.closeModal();
          this.router.navigate(['/']);//ruta de redirección
        } else {
          alert('Respuesta inválida del servidor.');
        }
      },
      error: (err) => {
        this.loading = false;
        alert('Login fallido: ' + (err.error?.message || 'Error desconocido'));
      }
    });
  }
}
