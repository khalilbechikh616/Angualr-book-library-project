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
  selector: 'app-horreur',
  templateUrl: './horreur.component.html',
  styleUrls: ['./horreur.component.css']
})
export class HorreurComponent {
  horrorBooks: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // Fetch horror books when the component initializes
    this.fetchHorrorBooks();
  }

  fetchHorrorBooks() {
    this.http.get<Book[]>('http://localhost/myphpapp1/book.php?nomcategorie=horreur')
      .subscribe(
        (response) => {
          // Assign the response to the horrorBooks array
          this.horrorBooks = response;
        },
        (error) => {
          console.error('Error fetching horror books:', error);
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
