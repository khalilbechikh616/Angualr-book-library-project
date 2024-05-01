import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprunterOkComponent } from './emprunterok.component';

describe('EmprunterokComponent', () => {
  let component: EmprunterOkComponent;
  let fixture: ComponentFixture<EmprunterOkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmprunterOkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmprunterOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
