import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprunternotokComponent } from './emprunternotok.component';

describe('EmprunternotokComponent', () => {
  let component: EmprunternotokComponent;
  let fixture: ComponentFixture<EmprunternotokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmprunternotokComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmprunternotokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
