import { CanActivateFn } from '@angular/router';

export const customersGuard: CanActivateFn = (route, state) => {
  return true;
};
