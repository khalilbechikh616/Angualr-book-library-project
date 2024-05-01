import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerercategorieComponent } from './gerercategorie.component';

describe('GerercategorieComponent', () => {
  let component: GerercategorieComponent;
  let fixture: ComponentFixture<GerercategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GerercategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerercategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
