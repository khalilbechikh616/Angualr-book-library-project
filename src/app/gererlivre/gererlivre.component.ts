import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-gererlivre',
  templateUrl: './gererlivre.component.html',
  styleUrls: ['./gererlivre.component.css']
})
export class GererlivreComponent {
  livre = {
    titre: '',
    auteur: '',
    nomcategorie: '',
    disponibilite: '',
    link_image: '',
    pdf_link: ''
  };
  showAddForm: boolean = false;
  showDeleteForm: boolean = false;
  idLivre: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient
  ) { }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleDeleteForm() {
    this.showDeleteForm = !this.showDeleteForm;
  }

  ajouterLivre() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(JSON.stringify(this.livre));
    this.http.post<any>('http://localhost/myphpapp1/book.php', this.livre, { headers })
      .subscribe(
        response => {
          console.log('Response from PHP:', response);
          if (response && response.message === "Livre ajouté avec succès") {
            alert('Livre ajouté avec succès');
            this.livre = {
              titre: '',
              auteur: '',
              nomcategorie: '',
              disponibilite: '',
              link_image: '',
              pdf_link: ''
            };
            this.showAddForm = false;
          } else {
            alert('Erreur lors de l\'ajout du livre: ' + response.error);
          }
        },
        error => {
          console.error('Error:', error);
          alert('Erreur lors de l\'envoi des données');
        }
      );
  }
  

  supprimerLivre() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = { id: this.idLivre }; // Prepare data to send to PHP script
    this.http.delete<any>('http://localhost/myphpapp1/book.php', { headers, body: data })
      .subscribe(
        response => {
          console.log('Response from PHP:', response);
          if (response && response.message === "Livre supprimé avec succès") {
            alert('Livre supprimé avec succès');
            // Optional: Reset idLivre to clear the input field
            this.idLivre = '';
          } else {
            alert('Erreur lors de la suppression du livre: ' + response.error);
          }
        },
        error => {
          console.error('Error:', error);
          alert('Erreur lors de la communication avec le serveur');
        }
      );
  }
}
