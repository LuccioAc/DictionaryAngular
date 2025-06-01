import { Component } from '@angular/core';
import { Roles } from '../../core/models/roles.enum';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  constructor(public auth: AuthService) {}

  isAdmin(): boolean {
    return this.auth.getUserRole() === Roles.Admin;
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
