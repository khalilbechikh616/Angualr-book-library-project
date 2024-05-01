import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gereremprunte',
  templateUrl: './gereremprunte.component.html',
  styleUrls: ['./gereremprunte.component.css']
})
export class GereremprunteComponent {
  idLivre: number = 0; // Initialize idLivre with a default value
  message: string = ''; // Variable to store message from API response

  constructor(private http: HttpClient) { }

  updateDisponibilite() {
    if (!this.idLivre) {
      alert("Veuillez entrer l'ID du livre.");
      return;
    }

    this.http.post<any>('http://localhost/myphpapp1/updatedisp.php', { id_livre: this.idLivre })
      .subscribe(
        response => {
          this.message = response.message;
          alert(this.message);

          if (response.statusCode === 200) {
            alert("Disponibilité updated successfully");
          } else if (response.statusCode == 201) {
            alert("Chaque livre a au maximum 5 copies");
          } else if (response.statusCode === 400) {
            console.log("kkjhkjhkjhkjhkj");
            alert("Required parameter 'id_livre' is missing");
          } else if (response.statusCode === 405) {
            alert("Invalid request method");
          } else {
            alert("Une erreur s'est produite. Veuillez réessayer.");
          }
        },
        error => {
          alert('Une erreur s\'est produite. Veuillez réesouiggisayer.');
          console.error('Erreur : ', error);
        }
      );
  }
}
