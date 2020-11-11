import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeANew0bookingComponent } from './make-a-new0booking.component';

describe('MakeANew0bookingComponent', () => {
  let component: MakeANew0bookingComponent;
  let fixture: ComponentFixture<MakeANew0bookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeANew0bookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeANew0bookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
