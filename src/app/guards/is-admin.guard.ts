import { CanActivateFn, Router } from '@angular/router'; 
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { map ,take } from 'rxjs';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  const router = inject(Router);

  return userService.isAdmin$ 
    .pipe(
      take(1), 
      map(isAdmin => {
        if (isAdmin) {
          return true; 
        } else {
          router.navigate(['main/home']); 
          return false;
        }
      })
    );
};