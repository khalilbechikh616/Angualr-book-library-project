import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {
    if (!this.sessionStorage) {
      console.error('SessionStorageService is not injected');
    }
  }

  onSubmit() {
    const headers = { 'Content-Type': 'application/json' };

    this.http.post<any>('http://localhost/myphpapp1/login.php', this.formData, { headers })
     .subscribe(
        response => {
          console.log('Login response:', response);

          if (response && response.user && response.user.email) {
            console.log('Login successful');
            sessionStorage.setItem('email', response.user.email); // Use sessionStorage directly
        
            this.router.navigate(['/homepage']);
          } else {
            console.log('Login failed');
            if (response && response.message === 'Email not found') {
              this.errorMessage = 'Email not found. Please enter a valid email.';
            } else if (response && response.message === 'Incorrect password') {
              this.errorMessage = 'Incorrect password. Please try again.';
            } else {
              this.errorMessage = 'An error occurred. Please try again later.';
            }
          }
        },
        error => {
          console.error('Error logging in:', error);
          this.errorMessage = 'An error occurred while processing your request. Please try again later.';
        }
      );
  }
}