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
  selector: 'app-bandedessines',
  templateUrl: './bandedessines.component.html',
  styleUrls: ['./bandedessines.component.css']
})
export class BandedessinesComponent {
  comicBooks: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // Fetch comic books when the component initializes
    this.fetchComicBooks();
  }

  fetchComicBooks() {
    this.http.get<Book[]>('http://localhost/myphpapp1/book.php?nomcategorie=bandedessines')
      .subscribe(
        (response) => {
          // Assign the response to the comicBooks array
          this.comicBooks = response;
        },
        (error) => {
          console.error('Error fetching comic books:', error);
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
