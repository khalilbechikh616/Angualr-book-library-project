import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandedessinesComponent } from './bandedessines.component';

describe('BandedessinesComponent', () => {
  let component: BandedessinesComponent;
  let fixture: ComponentFixture<BandedessinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandedessinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BandedessinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
