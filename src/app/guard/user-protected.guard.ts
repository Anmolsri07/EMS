import { CanActivateFn } from '@angular/router';
import { UserType } from '../interfaces/users';

export const userProtectedGuard: CanActivateFn = (route, state) => {
  const localUser = localStorage.getItem('user')
  if (!localUser) {
    return false;
  }
  const user = JSON.parse(localUser as string);
  if (user.role = UserType.CUSTOMER) {

    return true
  }
  return false;
};
