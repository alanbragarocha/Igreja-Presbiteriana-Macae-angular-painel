import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuteroComponent } from './lutero.component';

describe('LuteroComponent', () => {
  let component: LuteroComponent;
  let fixture: ComponentFixture<LuteroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuteroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
