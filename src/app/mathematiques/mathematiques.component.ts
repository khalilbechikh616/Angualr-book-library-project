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
  selector: 'app-mathematiques',
  templateUrl: './mathematiques.component.html',
  styleUrls: ['./mathematiques.component.css']
})
export class MathematiquesComponent {
  mathBooks: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // Fetch mathematiques books when the component initializes
    this.fetchMathBooks();
  }

  fetchMathBooks() {
    this.http.get<Book[]>('http://localhost/myphpapp1/book.php?nomcategorie=mathematiques')
      .subscribe(
        (response) => {
          // Assign the response to the mathBooks array
          this.mathBooks = response;
        },
        (error) => {
          console.error('Error fetching mathematiques books:', error);
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
