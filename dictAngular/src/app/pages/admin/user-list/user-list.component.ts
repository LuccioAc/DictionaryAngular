import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from '../modals/edit-user/edit-user.component';

interface UserDto {
  idusr: number;
  nameusr: string;
  passw: string;
  rol: boolean;
  codeusr: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    EditUserComponent
  ],
  templateUrl: './user-list.component.html',
  styles: ``
})
export class UserListComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  users: UserDto[] = [];
  openUserId: number | null = null;

  selectedUser: UserDto | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<UserDto[]>(`${environment.apiBaseUrl}/usuarios`)
      .subscribe({
        next: (data) => {
          const currentCode = this.auth.getUserName(); // 'username#id'
          this.users = data.filter(u => u.codeusr !== currentCode);
        },
        error: () => {
          alert('Error al cargar usuarios');
        }
      });
  }

  toggleOptions(id: number) {
    this.openUserId = this.openUserId === id ? null : id;
  }

  editUser(user: UserDto) {
    this.selectedUser = user;
  }

  deleteUser(user: UserDto) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    this.http.delete(`${environment.apiBaseUrl}/usuarios/${user.idusr}`)
      .subscribe({
        next: () => {
          this.users = this.users.filter(u => u.idusr !== user.idusr);
          alert('Usuario eliminado');
        },
        error: () => alert('Error al eliminar usuario')
      });
  }

  closeEditForm() {
    this.selectedUser = null;  // Cerrar el modal
  }
  
}
