import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Roles } from '../core/models/roles.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRoles = route.data['roles'] as Roles[] | undefined;
  if (expectedRoles && expectedRoles.length > 0) {
    const userRole = authService.getUserRole();
    if (!userRole || !expectedRoles.includes(userRole)) {
      router.navigate(['/login']); // o '/access-denied'
      return false;
    }
  }

  return true;
};
