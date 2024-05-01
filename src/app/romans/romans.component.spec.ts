import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomansComponent } from './romans.component';

describe('RomansComponent', () => {
  let component: RomansComponent;
  let fixture: ComponentFixture<RomansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RomansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RomansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
