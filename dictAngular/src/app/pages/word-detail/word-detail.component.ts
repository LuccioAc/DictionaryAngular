import { Component, Input, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-word-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit{
  @Input() wordId!: number;

  http = inject(HttpClient);
  auth = inject(AuthService);

  wordData: any = null;
  loading = false;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.http.get(`${environment.apiBaseUrl}/palabras/${this.wordId}`).subscribe({
      next: data => {
        this.wordData = data;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        alert('Error al cargar palabra');
      }
    });
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
