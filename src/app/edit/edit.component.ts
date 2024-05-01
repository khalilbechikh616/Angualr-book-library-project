import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
  };
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {
    if (!this.sessionStorage) {
      console.error('SessionStorageService is not injected');
    }
  }

  ngOnInit(): void {
    const email = sessionStorage.getItem('email');
    if (email) {
      // Fetch account details based on email and populate form fields
      this.fetchAccountDetails(email);
    } else {
      console.error('Email not found in session storage');
    }
  }

  fetchAccountDetails(email: string): void {
    this.http.get<any>('http://localhost/myphpapp1/comptedata.php?email=' + email)
     .subscribe(
        response => {
          if (response && response.email) {
            this.formData.firstName = response.Firstname;
            this.formData.lastName = response.Lastname;
            this.formData.email = response.email;
            this.formData.phoneNumber = response.telephonenumber;
          } else {
            console.error('Account details not found or invalid response:', response);
          }
        },
        error => {
          console.error('Error fetching account details:', error);
        }
      );
  }

  onSubmit(): void {
    // Trim the first name to ensure it doesn't exceed 50 characters
    this.formData.firstName = this.formData.firstName.trim();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>('http://localhost/myphpapp1/editprofile.php', this.formData, { headers })
     .subscribe(
        response => {
          console.log('Edit response:', response);
          if (response && response.message === 'Account updated successfully') {
            console.log('Account updated successfully');
            this.router.navigate(['/compte']);
          } else {
            console.error('Failed to update account:', response);
            this.errorMessage = response && response.message? response.message : 'Failed to update account. Please try again.';
          }
        },
        error => {
          console.error('Error updating account:', error);
          this.errorMessage = 'An error occurred while processing your request. Please try again later.';
        }
      );
  }
}