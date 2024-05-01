import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface HistoriqueBook {
  titre: string;
  auteur: string;
  link_image: string;
}

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  historiqueBooks: HistoriqueBook[] = [];
  userEmail: string | null = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch user email from session storage
    this.userEmail = sessionStorage.getItem('email');

    if (this.userEmail) {
      // Send GET request to fetch historical book details
      this.http.get<HistoriqueBook[]>('http://localhost/myphpapp1/histbookdetails.php', { params: { email: this.userEmail } })
        .subscribe(
          (response) => {
            this.historiqueBooks = response;
          },
          (error) => {
            console.error('Error fetching historical book details:', error);
            // Handle error
          }
        );
    }
  }
}
