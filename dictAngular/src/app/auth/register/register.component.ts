import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  nameusr = '';
  passw = '';
  generatedCodeusr: string | null = null; // Para mostrarlo en el HTML

  constructor(private auth: AuthService, private ui: UiService) {}

  register() {
    this.auth.register(this.nameusr, this.passw).subscribe({
      next: (res: any) => {
        console.log('Respuesta de registro:', res);
        if (res?.codeusr) {
          this.generatedCodeusr = res.codeusr;
        } else {
          alert('No se recibió codeusr desde el backend.');
        }
      },
      error: err => alert('Registro fallido')
    });
  }
  
  goToLogin() {
    this.generatedCodeusr = null;
    this.ui.switchModalMode(); // ✅ cambio de vista en modal
  }

  isRegistered(): boolean {
  return !!this.generatedCodeusr;
  }
}
