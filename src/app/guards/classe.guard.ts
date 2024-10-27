import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClasseGuard implements CanActivate {
  private allowedClasses = ['IT1', 'DSI2', 'DSI3', 'RSI2', 'RSI3', 'SEM2', 'SEM3'];

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const classe = route.paramMap.get('classe');

    // Check if the classe is in the allowed list
    if (classe && this.allowedClasses.includes(classe)) {
      return true; 
    }

    // NAVIGATE LEL 404
    this.router.navigate(['/404']); 
    return false;
  }
}
