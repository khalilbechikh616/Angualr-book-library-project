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
  selector: 'app-romans',
  templateUrl: './romans.component.html',
  styleUrls: ['./romans.component.css']
})
export class RomansComponent {
  romanceBooks: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // Fetch romance books when the component initializes
    this.fetchRomanceBooks();
  }

  fetchRomanceBooks() {
    this.http.get<Book[]>('http://localhost/myphpapp1/book.php?nomcategorie=romans')
      .subscribe(
        (response) => {
          // Filter the response to get only romance books
          this.romanceBooks = response
        },
        (error) => {
          console.error('Error fetching romance books:', error);
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
