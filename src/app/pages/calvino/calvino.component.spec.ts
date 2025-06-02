import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalvinoComponent } from './calvino.component';

describe('CalvinoComponent', () => {
  let component: CalvinoComponent;
  let fixture: ComponentFixture<CalvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalvinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
