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
  selector: 'app-informatique',
  templateUrl: './informatique.component.html',
  styleUrls: ['./informatique.component.css']
})
export class InformatiqueComponent {
  informatiqueBooks: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // Fetch informatique books when the component initializes
    this.fetchInformatiqueBooks();
  }

  fetchInformatiqueBooks() {
    this.http.get<Book[]>('http://localhost/myphpapp1/book.php?nomcategorie=informatiques')
      .subscribe(
        (response) => {
          // Assign the response to the informatiqueBooks array
          this.informatiqueBooks = response;
        },
        (error) => {
          console.error('Error fetching informatique books:', error);
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
