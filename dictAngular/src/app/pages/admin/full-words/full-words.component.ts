import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-full-words',
  imports: [FormsModule],
  templateUrl: './full-words.component.html',
  styleUrls: ['./full-words.component.css']
})
export class FullWordsComponent implements OnInit {
  palabras: any[] = [];
  usos: any[] = [];
  antonimos: any[] = [];
  sinonimos: any[] = [];
  similares: any[] = [];
  newUsage = { wordId: 0, wuse: '', descrip: '' };  // New usage object

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadWords(); // Load words on component initialization
  }

  // Load words to display them in the list
  loadWords() {
    // Cargar las palabras
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/palabras`).subscribe(data => {
      this.palabras = data;
    });

    // Cargar los usos
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/relaciones/usos`).subscribe(data => {
      this.usos = data;
    });

    // Cargar los antónimos
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/relaciones/antonimos`).subscribe(data => {
      this.antonimos = data;
    });

    // Cargar los sinónimos
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/relaciones/sinonimos`).subscribe(data => {
      this.sinonimos = data;
    });

    // Cargar los similares
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/relaciones/similares`).subscribe(data => {
      this.similares = data;
    });
  }

  // Load usages of a selected word by its ID
  loadUsages(idWord: number) {
    this.http.get<any[]>(`${environment.apiBaseUrl}/api/Usoes/palabra/${idWord}`).subscribe(data => {
      this.usos = data;
    });
  }

  // Create a new usage
  createUsage() {
  if (this.newUsage.wordId && this.newUsage.wuse && this.newUsage.descrip) {
    const newUsageDto = { 
      Idword: this.newUsage.wordId, 
      Wuse: this.newUsage.wuse, 
      Descrip: this.newUsage.descrip 
    };

    this.http.post(`${environment.apiBaseUrl}/api/Usoes`, newUsageDto).subscribe(() => {
      alert('Uso creado exitosamente');
      this.loadUsages(this.newUsage.wordId); // Re-cargar los usos para la palabra seleccionada
      this.resetNewUsage(); // Resetear el formulario
    }, error => {
      alert('Error al crear el uso');
    });
  } else {
    alert('Por favor complete todos los campos.');
  }
}

  // Delete a usage by id
deleteUsage(id: number) {
  this.http.delete(`${environment.apiBaseUrl}/api/Usoes/${id}`).subscribe(() => {
    alert('Uso eliminado');
    
    // Usamos 'wordId' para recargar los usos asociados con la palabra seleccionada
    this.loadUsages(this.newUsage.wordId); // Reload usages after deletion
  }, error => {
    alert('Error al eliminar el uso');
  });
}

  // Reset the new usage form
  resetNewUsage() {
    this.newUsage = { wordId: 0, wuse: '', descrip: '' };
  }

  // Method to handle word selection for the form
  onWordSelect(word: string) {
  const selectedWord = this.palabras.find(p => p.word === word);
  if (selectedWord) {
    this.newUsage.wordId = selectedWord.id; // Aquí estamos asignando el 'id' de la palabra, no el 'word'
    this.loadUsages(selectedWord.id); // Cargamos los usos para esta palabra
  }
}
}
