import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { WordDetailComponent } from '../word-detail/word-detail.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, WordDetailComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  http = inject(HttpClient);
  auth = inject(AuthService);

  query = '';
  results: { idword: number; word: string }[] = [];
  selectedId: number | null = null;

  apiUrl = environment.apiBaseUrl;

  search() {
    if (!this.query.trim()) {
      this.results = [];
      return;
    }

    this.http.get<{ idword: number; word: string }[]>(`${this.apiUrl}/palabras`)
      .subscribe({
        next: data => {
          const q = this.query.toLowerCase();
          this.results = data.filter(d => d.word.toLowerCase().includes(q));
        },
        error: () => this.results = []
      });
  }

  selectWord(id: number) {
    this.selectedId = id;
  }

  closeDetail() {
    this.selectedId = null;
  }
}
