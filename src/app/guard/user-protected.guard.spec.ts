import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userProtectedGuard } from './user-protected.guard';

describe('userProtectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userProtectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
