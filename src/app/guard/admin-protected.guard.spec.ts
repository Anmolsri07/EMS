import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminProtectedGuard } from './admin-protected.guard';

describe('adminProtectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminProtectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
