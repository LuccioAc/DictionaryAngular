import { Injectable, signal } from '@angular/core';

type ModalMode = 'login' | 'register';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  sidebarVisible = signal(false);
  modalVisible = signal(false);
  modalMode = signal<ModalMode>('login');

  // Modal de incidente
  incidentModalVisible = signal(false);

  toggleSidebar(): void {
    this.sidebarVisible.update(v => !v);
  }

  showModal(mode: ModalMode): void {
    this.modalMode.set(mode);
    this.modalVisible.set(true);
  }

  closeModal(): void {
    this.modalVisible.set(false);
  }

  switchModalMode(): void {
    const newMode = this.modalMode() === 'login' ? 'register' : 'login';
    this.modalMode.set(newMode);
  }

  showIncidentModal(): void {
    this.incidentModalVisible.set(true);
  }

  closeIncidentModal(): void {
    this.incidentModalVisible.set(false);
  }
}
