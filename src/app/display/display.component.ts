import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Book {
  id_livre: number;
  titre: string;
  auteur: string;
  nomcategorie: string;
  disponibilite: number;
  link_image: string;
  pdf_link: string;
}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  books: Book[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Initially fetch all books
    this.fetchBooks();
  }

  fetchBooks(searchQuery?: string, searchField?: string) {
    let url = 'http://localhost/myphpapp1/display.php';

    // Check if search query and search field are provided
    if (searchQuery && searchField) {
      // Construct the URL with search parameters
      url += `?${searchField}=${searchQuery}`;
    }

    // Make the GET request to fetch books
    this.http.get<Book[]>(url)
      .subscribe(
        (response) => {
          // Update the books array with the fetched books
          this.books = response;
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }

  handleBookEmprunt(disponibilite: number) {
    if (disponibilite >= 1 && disponibilite <= 3) {
      console.log('Emprunt OK');
    } else {
      console.log('Emprunt NOT OK');
    }
  }
}
