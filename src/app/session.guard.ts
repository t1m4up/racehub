import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseAuthService } from './auth.service';

export async function isAuthenticatedGuard() {
  const authService = inject(SupabaseAuthService);
  const router = inject(Router);
  const { data, error } = await authService.getSession();

  if (error || !data?.session) {
    return router.createUrlTree(['/login']);
  }

  return true;
}
