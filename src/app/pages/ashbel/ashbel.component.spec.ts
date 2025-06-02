import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AshbelComponent } from './ashbel.component';

describe('AshbelComponent', () => {
  let component: AshbelComponent;
  let fixture: ComponentFixture<AshbelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AshbelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AshbelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
