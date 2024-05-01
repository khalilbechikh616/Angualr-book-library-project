import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  ngOnInit(): void {
    
  }
  isMainContentVisible: boolean = false;
  showMainContent() {
    this.isMainContentVisible = true;
  }

  hideMainContent() {
    this.isMainContentVisible = false;
  }

  toggleMainContentVisibility() {
    this.isMainContentVisible = !this.isMainContentVisible;
  }
}
