import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  firstname: string = '';
  gmail: string = '';
  lastname: string = '';
  phoneNumber: string = '';
  id_compte: number | null = null;

  passwordVisible: boolean = false;

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private sessionStorage: SessionStorageService
  ) {
    if (!this.sessionStorage) {
      console.error('SessionStorageService is not injected');
    }
  }

  ngOnInit(): void {
    const email = sessionStorage.getItem('email');
    
    if (email) {
      this.gmail = email;
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
            this.firstname = response.Firstname;
            this.lastname = response.Lastname;
            this.gmail = response.email;
            this.phoneNumber = response.telephonenumber;
          } else {
            console.error('Account details not found or invalid response:', response);
          }
        },
        error => {
          console.error('Error fetching account details:', error);
        }
      );
  }

  navigateToEdit(): void {
    this.router.navigate(['/edit']);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible =!this.passwordVisible;
  }

  selectImage(): void {
    const inputFile = document.getElementById('image-input');
    if (inputFile) {
      inputFile.click();
    }
  }

  handleImageInput(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const profilePic = document.querySelector('.profile-picture img');
        if (profilePic) {
          profilePic.setAttribute('src', e.target.result);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  }
}