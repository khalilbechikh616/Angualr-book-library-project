import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Book {
  id_livre: number;
  titre: string;
  auteur: string;
  nomcategorie: string;
  disponibilite: number;
  link_image: string;
  pdf_link: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  isMainContentVisible: boolean = false;
  isDropdownOpen: boolean = false;
  books: Book[] = [];
  citations: string[] = [
    "Un livre a toujours de deux auteurs celui qui l'écrit et celui que le lit",
    "Une chambre sans livres est comme un corps sans âme.",
    "La lumière est dans le livre, laissez-le rayonner.",
    "Lire, c'est boire et manger. L'esprit qui ne lit pas maigrit comme le corps qui ne mange pas.",
    "Un livre c'est un arbre qui cherche comment dire à toute la forêt qu'il y a une vie... après la vie.",
    "La lecture agrandit l âme  et un ami éclairé la console.",
    "La lecture apporte à l'homme plénitude, le discours assurance et l écriture exactitude.",
    "Chaque lecture est un acte de résistance. Une lecture bien menée sauve de tout, y compris de soi-même.",
    "La vraie lecture commence quand on ne lit plus seulement pour se distraire et se fuir, mais pour se trouver.",
  ];
  currentCitationIndex: number = 0;
  dynamicCitation: string = "";
  userEmail: string = ''; // Variable to store user email

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;
  searchQuery: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchBooks();
    this.rotateCitations();
  }

 fetchBooks(searchQuery?: string, searchField?: string) {
    let url = 'http://localhost/myphpapp1/book.php';
    if (searchQuery && searchField) {
      url += `?${searchField}=${searchQuery}`;
    }
    this.http.get<Book[]>(url)
      .subscribe(
        (response) => {
          this.books = response;
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }

  onSubmit() {
    console.log('Form submitted!');
    if (this.searchInput) {
      const searchQuery = this.searchInput.nativeElement.value.trim();
      this.fetchBooks(searchQuery, 'auteur');
      console.log(searchQuery);
    }
  }

  showMainContent() {
    this.isMainContentVisible = true;
  }

  hideMainContent() {
    this.isMainContentVisible = false;
  }

  toggleMainContentVisibility() {
    this.isMainContentVisible = !this.isMainContentVisible;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    // Prevent page refresh for clicks on links without specific routing
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' && !target.getAttribute('routerLink')) {
      event.preventDefault();
    }
  }

  // Function to navigate to a specific route
  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  // Method to focus on the search input field and update placeholder text
  changePlaceholderAndFocus(placeholderText: string, searchField: string) {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput) {
      searchInput.placeholder = placeholderText;
      searchInput.focus(); // Focus on the search input field
      this.shineSearchZone(); // Trigger the shining effect
      this.fetchBooks(placeholderText, searchField);
    }
  }

  shineSearchZone() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.classList.add('shine');
      setTimeout(() => {
        searchInput.classList.remove('shine');
      }, 500); // Duration of animation in milliseconds
    }
  }

  navigateToHomePage() {
    this.toggleMainContentVisibility(); // Toggle the visibility of main content
    this.router.navigateByUrl('/homepage', { skipLocationChange: false }).then(() => {
      window.scrollTo(0, 0);
    });
  }

  navigateToBookDetails(pdfLink: string) {
    window.open(pdfLink, '_blank');
  }
  handleBookEmprunt(disponibilite: number, titre: string, id_livre: number, auteur: string, link_image: string) {
    if (disponibilite >= 1 && disponibilite <= 5) {
        const userEmail = sessionStorage.getItem('email'); // Fetch user email from sessionStorage
        if (userEmail) {
            // Use userEmail
            this.http.post<any>('http://localhost/myphpapp1/insertintoemprunt.php', JSON.stringify({ id_livre, email: userEmail }))
                .subscribe(
                    (response) => {
                        console.log('Borrowing response:', response);
                        // Check if the borrowing was successful
                        if (response && response.message === "Emprunt successful") {
                            // Decrement disponibilite locally
                            const bookIndex = this.books.findIndex(book => book.id_livre === id_livre);
                            if (bookIndex !== -1) {
                                this.books[bookIndex].disponibilite--;
                            }
                            // Call function to add book details to historique
                            this.addToHistorique(userEmail, titre, auteur, link_image);
                            // Navigate to emprunterok component
                            this.router.navigate(['/emprunterok'], {
                                queryParams: { titre: titre, id_livre: id_livre, email: userEmail }
                            });
                        } else if (response && response.message === "You have already borrowed this book.") {
                            // Show error message if the user has already borrowed the book
                            alert("You can't borrow the same book twice.");
                        } else {
                            // Show error message for other cases
                            alert('Error borrowing book. Please try again.');
                        }
                    },
                    (error) => {
                        // Check for 409 status code (Conflict) specifically
                        if (error.status === 409) {
                            alert("You can't borrow the same book twice.");
                        } else {
                            console.error('Error borrowing book:', error);
                            // Show generic error message
                            alert('Error borrowing book. Please try again.');
                        }
                    }
                );
        } else {
            // If user email is not available in sessionStorage, prompt user to login
            alert('Please login to borrow books.');
            this.router.navigate(['/login']);
        }
    } else {
        // Navigate to emprunternotok component
        this.router.navigate(['/emprunternotok']);
    }
}

// Function to add book details to historique
addToHistorique(email: string, titre: string, auteur: string, link_image: string) {
    this.http.post<any>('http://localhost/myphpapp1/historique.php', JSON.stringify({ email, titre, auteur, link_image }))
        .subscribe(
            (response) => {
                console.log('Adding to historique response:', response);
                // Check if the insertion was successful
                if (response && response.message === "Data inserted into historique table successfully") {
                    console.log('Book details added to historique successfully');
                } else {
                    console.error('Error adding book details to historique:', response);
                }
            },
            (error) => {
                console.error('Error adding book details to historique:', error);
            }
        );
}

 rotateCitations() {
    setInterval(() => {
      this.dynamicCitation = this.citations[this.currentCitationIndex];
      this.currentCitationIndex = (this.currentCitationIndex + 1) % this.citations.length;
    }, 5000); // Adjust the interval as needed
  }

  // Method to fetch user email from sessionStorage
  getUserEmail() {
    this.userEmail = sessionStorage.getItem('email') || '';
  }
}
