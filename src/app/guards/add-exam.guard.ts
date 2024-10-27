import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const addExamGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService); 
  const router = inject(Router);

  return usersService.isLoggedIn$.pipe(
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;  
      } else {
        router.navigate(['/main/login']);  
        return false;
      }
    }),
    catchError((err) => {
      console.log('Error checking login status:', err);
      router.navigate(['/login']);  
      return of(false);
    })
  );
};
