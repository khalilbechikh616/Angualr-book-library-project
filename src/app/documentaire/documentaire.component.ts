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
  selector: 'app-documentaires',
  templateUrl: './documentaire.component.html',
  styleUrls: ['./documentaire.component.css']
})
export class DocumentaireComponent {
  documentairesBooks: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // Fetch documentary books when the component initializes
    this.fetchDocumentairesBooks();
  }

  fetchDocumentairesBooks() {
    this.http.get<Book[]>('http://localhost/myphpapp1/book.php?nomcategorie=documentaires')
      .subscribe(
        (response) => {
          // Assign the response to the documentairesBooks array
          this.documentairesBooks = response;
        },
        (error) => {
          console.error('Error fetching documentary books:', error);
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
