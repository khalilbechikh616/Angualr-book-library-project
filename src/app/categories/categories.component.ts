import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: any = [];

  constructor(private http: HttpClient) {
    this.fetchCategories();
  }

  fetchCategories() {
    this.http.get('http://localhost/myphpapp1/categorie.php')
      .subscribe((response: any) => {
        this.categories = response;
      });
  }
}