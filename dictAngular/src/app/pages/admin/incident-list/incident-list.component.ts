import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth/auth.service';

interface Incident {
  idinc: number;
  descrip: string;
  activo: boolean;
}

@Component({
  selector: 'app-incident-list',
  imports: [CommonModule],
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent {
  http = inject(HttpClient);
  auth = inject(AuthService);

  incidents: Incident[] = [];
  loading = false;

  ngOnInit() {
    this.loadIncidents();
  }

  loadIncidents() {
    this.loading = true;
    this.http.get<Incident[]>(`${environment.apiBaseUrl}/incidents`)
      .subscribe({
        next: data => {
          this.incidents = data;
          this.loading = false;
        },
        error: () => {
          alert('Error al cargar incidentes');
          this.loading = false;
        }
      });
  }

  toggleEstado(inc: Incident) {
    const nuevoEstado = !inc.activo;
    this.http.put(`${environment.apiBaseUrl}/incidents/${inc.idinc}/status`, { activo: nuevoEstado })
      .subscribe({
        next: () => {
          inc.activo = nuevoEstado;
        },
        error: () => {
          alert('Error al cambiar estado');
        }
      });
  }

  eliminarIncidente(id: number) {
    if (!confirm('¿Estás seguro de eliminar este incidente?')) return;

    this.http.delete(`${environment.apiBaseUrl}/incidents/${id}`)
      .subscribe({
        next: () => {
          this.incidents = this.incidents.filter(i => i.idinc !== id);
        },
        error: () => {
          alert('Error al eliminar');
        }
      });
  }
}
