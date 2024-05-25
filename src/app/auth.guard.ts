import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from './core/services/user_auth/user-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authservice = inject(UserAuthService)
  // let isLoggedIn =localStorage.getItem('userData')
  const isLoggedIn = authservice.isLoggedIn()

  if(!isLoggedIn){
    router.navigate(['/login'])
    return false;
  }
  return true;
};
