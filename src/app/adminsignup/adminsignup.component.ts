import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminsignup',
  templateUrl: './adminsignup.component.html',
  styleUrls: ['./adminsignup.component.css']
})
export class AdminsignupComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private http: HttpClient) { }

  login() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>('http://localhost/myphpapp1/login_as_admin.php', this.formData, { headers })
      .subscribe(
        response => {
          console.log('Login response:', response);
          if (response && response.admin) {
            console.log('Admin login successful');
            this.router.navigate(['/admin']); // Navigate to admin component
          } else {
            console.log('Admin login failed');
            // Handle invalid login
            alert('Incorrect email or password. Please try again.');
          }
        },
        error => {
          console.error('Error logging in as admin:', error);
          // Handle error
          alert('An error occurred while processing your request. Please try again later.');
        }
      );
  }
}
