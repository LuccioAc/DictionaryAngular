import { Component, Input, Output, 
  EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-incident-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incident-modal.component.html',
  styleUrls: ['./incident-modal.component.css']
})
export class IncidentModalComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  http = inject(HttpClient);
  auth = inject(AuthService);

  description = '';
  loading = false;

  submitIncident() {
    if (!this.description.trim()) return;

    this.loading = true;
    const codeusr = this.auth.getUserName();

    this.http.post(`${environment.apiBaseUrl}/incidents`, {
      descrip: this.description
    }).subscribe({
      next: () => {
        this.loading = false;
        alert('Incidente enviado');
        this.close.emit();
      },
      error: err => {
        this.loading = false;
        alert('Error al enviar el incidente');
      }
    });
  }

  onClose() {
    this.close.emit();
  }
}
