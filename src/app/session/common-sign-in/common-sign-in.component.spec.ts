import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSignInComponent } from './common-sign-in.component';

describe('CommonSignInComponent', () => {
  let component: CommonSignInComponent;
  let fixture: ComponentFixture<CommonSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
