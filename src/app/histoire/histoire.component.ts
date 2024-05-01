import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Book {
  id: number;
  titre: string;
  auteur: string;
  nomcategorie: string;
  disponibilite: number;
  link_image: string;
  pdf_link: string;
}

@Component({
  selector: 'app-histoire',
  templateUrl: './histoire.component.html',
  styleUrls: ['./histoire.component.css']
})
export class HistoireComponent {
  histoireBooks: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // Fetch history books when the component initializes
    this.fetchHistoireBooks();
  }

  fetchHistoireBooks() {
    this.http.get<Book[]>('http://localhost/myphpapp1/book.php?nomcategorie=histoire')
      .subscribe(
        (response) => {
          // Assign the response to the histoireBooks array
          this.histoireBooks = response;
        },
        (error) => {
          console.error('Error fetching history books:', error);
        }
      );
  }

  handleBookEmprunt(disponibilite: number) {
    if (disponibilite >= 1 && disponibilite <= 3) {
      // Navigate to empruntok component
      this.router.navigate(['/emprunterok']);
    } else {
      // Navigate to empruntnotok component
      this.router.navigate(['/emprunternotok']);
    }
  }
}
