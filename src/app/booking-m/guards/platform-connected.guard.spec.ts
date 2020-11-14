import { TestBed } from '@angular/core/testing';

import { PlatformConnectedGuard } from './platform-connected.guard';

describe('PlatformConnectedGuard', () => {
  let guard: PlatformConnectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlatformConnectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
