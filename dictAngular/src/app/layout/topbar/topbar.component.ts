import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService } from '../../core/services/ui.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: []
})
export class TopbarComponent {
  constructor(
    public ui: UiService,
    private auth: AuthService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
