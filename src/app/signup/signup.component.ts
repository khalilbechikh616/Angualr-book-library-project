import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage'; // Import SessionStorageService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formData = {
    firstname: '',
    lastname: '',
    email: '',
    birthdaydate: '',
    telephone: '',
    password: ''
  };
  confirmPassword: string = ''; // Add confirmPassword field
  errorMessage = '';

  constructor(
    private router: Router, 
    private http: HttpClient,
    private sessionStorage: SessionStorageService // Inject SessionStorageService
  ) {
    if (!this.sessionStorage) {
      console.error('SessionStorageService is not injected');
    }
  }

  onSubmit() {
    // Check if all fields are filled
    if (!this.formData.firstname ||!this.formData.lastname ||!this.formData.email ||!this.formData.birthdaydate ||!this.formData.telephone ||!this.formData.password ||!this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Check if password and confirm password match
    if (this.formData.password!== this.confirmPassword) {
      this.errorMessage = 'Password and confirm password do not match.';
      alert('Password and confirm password do not match.'); // Display alert message
      return;
    }

    // Submit the form if all validations pass
    this.http.post<any>('http://localhost/myphpapp1/signup.php', JSON.stringify(this.formData))
     .subscribe(
        response => {
          console.log('Registration successful:', response);
          if (response.user) {
            // Store the newly registered email in session storage
            sessionStorage.setItem('email', this.formData.email);
            this.navigateToHomepage(); // Navigate to compte component after successful registration
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
        },
        error => {
          console.error('Error registering:', error);
          this.errorMessage = 'An error occurred while processing your request. Please try again later.';
        }
      );
  }

  navigateToHomepage() {
    this.router.navigate(['/homepage']); // Navigate to compte component
  }
}