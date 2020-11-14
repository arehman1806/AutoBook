import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlatformComponent } from './new-platform.component';

describe('NewPlatformComponent', () => {
  let component: NewPlatformComponent;
  let fixture: ComponentFixture<NewPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPlatformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
