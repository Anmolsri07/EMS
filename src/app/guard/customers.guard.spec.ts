import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { customersGuard } from './customers.guard';

describe('customersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => customersGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
