import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorreurComponent } from './horreur.component';

describe('HorreurComponent', () => {
  let component: HorreurComponent;
  let fixture: ComponentFixture<HorreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorreurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
