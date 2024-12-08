import { CanActivateFn } from '@angular/router';

export const userProtectedGuard: CanActivateFn = (route, state) => {
  const localUser = localStorage.getItem('user')
  if(!localUser) {
    return false;
  }
  const user = JSON.parse(localUser as string);
  if(user.role = 'user') {
    return true
  }
  return false;
};
