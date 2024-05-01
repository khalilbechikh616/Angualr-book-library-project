import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererlivreComponent } from './gererlivre.component';

describe('GererlivreComponent', () => {
  let component: GererlivreComponent;
  let fixture: ComponentFixture<GererlivreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GererlivreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GererlivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
