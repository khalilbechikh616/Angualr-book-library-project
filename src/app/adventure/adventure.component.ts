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
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent {
  adventureBooks: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // Fetch adventure books when the component initializes
    this.fetchAdventureBooks();
  }

  fetchAdventureBooks() {
    this.http.get<Book[]>('http://localhost/myphpapp1/book.php?nomcategorie=adventure')
      .subscribe(
        (response) => {
          // Assign the response to the adventureBooks array
          this.adventureBooks = response;
        },
        (error) => {
          console.error('Error fetching adventure books:', error);
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
