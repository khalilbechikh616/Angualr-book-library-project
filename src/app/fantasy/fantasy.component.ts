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
  selector: 'app-fantasy',
  templateUrl: './fantasy.component.html',
  styleUrls: ['./fantasy.component.css']
})
export class FantasyComponent {
  fantasyBooks: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // Fetch fantasy books when the component initializes
    this.fetchFantasyBooks();
  }

  fetchFantasyBooks() {
    this.http.get<Book[]>('http://localhost/myphpapp1/book.php?nomcategorie=fantasy')
      .subscribe(
        (response) => {
          // Assign the response to the fantasyBooks array
          this.fantasyBooks = response;
        },
        (error) => {
          console.error('Error fetching fantasy books:', error);
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
