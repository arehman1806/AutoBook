import { TestBed } from '@angular/core/testing';

import { RedirectEmailVerified } from './redirect-email-verified';

describe('EmailVerifiedGuard', () => {
  let guard: RedirectEmailVerified;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectEmailVerified);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
