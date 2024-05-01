import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gerercategorie',
  templateUrl: './gerercategorie.component.html',
  styleUrls: ['./gerercategorie.component.css']
})
export class GerercategorieComponent {
  categorie = {
    nomcategorie: '',
    link_img: ''
  };
  showAddForm: boolean = false;
  showDeleteForm: boolean = false;
  nomcategorie: string = '';
  categories: any[] = []; // Add this property

  constructor(
    private http: HttpClient
  ) { }

  toggleAddForm() {
    this.showAddForm =!this.showAddForm;
  }

  toggleDeleteForm() {
    this.showDeleteForm =!this.showDeleteForm;
  }

  ajouterCategorie() {
    this.http.post('http://localhost/myphpapp1/categorie.php', {
      nomcategorie: this.categorie.nomcategorie,
      link_img: this.categorie.link_img
    }).subscribe(response => {
      this.categorie = {
        nomcategorie: '',
        link_img: ''
      };
      alert('Catégorie ajoutée avec succès'); // Add this line
    });
  }
  
  supprimerCategorie() {
    const headers = { 'Content-Type': 'application/json' };
    const data = { nomcategorie: this.nomcategorie }; // Prepare data to send to PHP script
    this.http.delete<any>('http://localhost/myphpapp1/categorie.php', { headers, body: data })
  .subscribe(
        response => {
          console.log('Response from PHP:', response);
          if (response && response.message === "Categorie deleted successfully") {
            alert('Catégorie supprimée avec succès');
            // Optional: Reset nomcategorie to clear the input field
            this.nomcategorie = '';
          } else {
            alert('Erreur lors de la suppression de la catégorie');
          }
        },
        error => {
          if (error.status === 200) { // Check if the error is due to successful deletion
            alert('Catégorie supprimée avec succès');
          } else {
            console.error('Error:', error);
            alert('Erreur lors de la communication avec le serveur');
          }
        }
      );
  }
}