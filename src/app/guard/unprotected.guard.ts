import { CanActivateFn } from '@angular/router';

export const unprotectedGuard: CanActivateFn = (route, state) => {
  const localUser = localStorage.getItem('user');
  if(localUser) {
    return false
  }
  return true;
};
