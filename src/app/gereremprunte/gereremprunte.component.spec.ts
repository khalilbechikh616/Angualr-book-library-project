import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GereremprunteComponent } from './gereremprunte.component';

describe('GereremprunteComponent', () => {
  let component: GereremprunteComponent;
  let fixture: ComponentFixture<GereremprunteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GereremprunteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GereremprunteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
