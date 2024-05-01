import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gerercompte',
  templateUrl: './gerercompte.component.html',
  styleUrls: ['./gerercompte.component.css']
})
export class GerercompteComponent {

  showDeleteForm: boolean = false;
  email: string = '';

  constructor(private http: HttpClient) { }

  toggleDeleteForm() {
    this.showDeleteForm = !this.showDeleteForm;
  }

  submitDeleteForm() {
    const headers = { 'Content-Type': 'application/json' };
    const body = { email: this.email };

    this.http.post<any>('http://localhost/myphpapp1/deletecompte.php', body, { headers })
      .subscribe(
        response => {
          if (response && response.message) {
            console.log(response.message);
            // Reset the email field
            this.email = '';
            // Hide the delete form after submission
            this.showDeleteForm = false;
            // Display success alert
            alert(response.message);
          } else if (response && response.error) {
            console.error(response.error);
            // Display error alert
            alert(response.error);
          }
        },
        error => {
          console.error('Error:', error);
          // Display error alert
          alert('Error deleting compte');
        }
      );
  }

}
