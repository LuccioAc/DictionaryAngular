import { Component, inject, computed} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiService } from './core/services/ui.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "./pages/search/search.component";
import { IncidentModalComponent } from './shared/incident-modal.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent,
    RegisterComponent, SidebarComponent,
    TopbarComponent, CommonModule,
    SearchComponent, IncidentModalComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  ui = inject(UiService);
  auth = inject(AuthService);
  showSidebar = computed(() => this.ui.sidebarVisible());
  showModal = computed(() => this.ui.modalVisible());
  isLogin = computed(() => this.ui.modalMode() === 'login');
}
