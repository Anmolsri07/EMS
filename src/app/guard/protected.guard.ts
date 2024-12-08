import { CanActivateFn } from '@angular/router';

// This guard is only user for common user
export const protectedGuard: CanActivateFn = (route, state) => {
  const localUser = localStorage.getItem('user');
  if (localUser) {
    return true;
  }
  return false;
};
