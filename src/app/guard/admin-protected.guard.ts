import { CanActivateFn } from '@angular/router';

// This guard is only use for admin user
export const adminProtectedGuard: CanActivateFn = (route, state) => {
  const localUser = localStorage.getItem('user')
  if(!localUser) {
    return false
  }
  const user = JSON.parse(localUser as string)
  if(user.role === 'admin') {
    return true
  }
  return false;
};
