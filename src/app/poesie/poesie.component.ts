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
  selector: 'app-poesie',
  templateUrl: './poesie.component.html',
  styleUrls: ['./poesie.component.css']
})
export class PoesieComponent {
  poetryBooks: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // Fetch poetry books when the component initializes
    this.fetchPoetryBooks();
  }

  fetchPoetryBooks() {
    this.http.get<Book[]>('http://localhost/myphpapp1/book.php?nomcategorie=poesie')
      .subscribe(
        (response) => {
          // Assign the response to the poetryBooks array
          this.poetryBooks = response;
        },
        (error) => {
          console.error('Error fetching poetry books:', error);
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
