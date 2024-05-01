import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathematiquesComponent } from './mathematiques.component';

describe('MathematiquesComponent', () => {
  let component: MathematiquesComponent;
  let fixture: ComponentFixture<MathematiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MathematiquesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MathematiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
