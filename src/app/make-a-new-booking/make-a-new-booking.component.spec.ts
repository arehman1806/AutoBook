import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeANewBookingComponent } from './make-a-new-booking.component';

describe('MakeANewBookingComponent', () => {
  let component: MakeANewBookingComponent;
  let fixture: ComponentFixture<MakeANewBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeANewBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeANewBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
