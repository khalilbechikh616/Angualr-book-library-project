import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-emprunterok',
  templateUrl: './emprunterok.component.html',
  styleUrls: ['./emprunterok.component.css']
})
export class EmprunterOkComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  titre: string = '';
  dateEmprunt: string = '';
  dateRetour: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const userEmail = window.sessionStorage.getItem('email');
    if (userEmail) {
      this.getUserInfoByEmail(userEmail);
    }

    this.route.queryParams.subscribe(params => {
      this.titre = params['titre']; // Get the book title from query parameters
      const currentDate = new Date();
      const retourDate = new Date();
      retourDate.setDate(retourDate.getDate() + 5);
      this.dateEmprunt = this.formatDate(currentDate);
      this.dateRetour = this.formatDate(retourDate);
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  }

  getUserInfoByEmail(email: string) {
    const apiUrl = 'http://localhost/myphpapp1/userInfo.php';
    const headers = { 'Content-Type': 'application/json' };

    this.http.get<any>(apiUrl, { params: { email } }).subscribe(
      response => {
        console.log('User data response:', response);
        if (response && response.Firstname && response.Lastname) {
          this.firstName = response.Firstname;
          this.lastName = response.Lastname;
        } else {
          console.error('Error fetching user data: Missing first name or last name');
        }
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onPrintClick() {
    window.print();
  }
}
