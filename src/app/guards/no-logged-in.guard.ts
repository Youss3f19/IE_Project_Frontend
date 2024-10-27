import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

export const noLoggedInGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    usersService.checkTokenValidity().then((isLoggedIn: boolean) => {
      console.log('Guard - LoggedIn Status after token validation:', isLoggedIn);
      if (isLoggedIn) {
        console.log('User is logged in, redirecting to /home');
        router.navigate(['/main/home']);
        resolve(false); // tsaker e login
      } else {
        console.log('User is not logged in, allowing access to login');
        resolve(true);  // thell elogin
      }
    }).catch((err) => {
      console.log('Error in guard:', err);
      resolve(false);  // ken fama ghalta tsaker zeda
    });
  });
};
