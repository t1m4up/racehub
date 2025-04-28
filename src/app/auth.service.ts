import { computed, inject, Injectable, signal } from '@angular/core';
import { injectSupabaseClient } from './supabase-client';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService {
  private supabase = injectSupabaseClient();
  private session = signal<unknown>(null);
  readonly loggedIn = computed(() => !!this.session());
  private router = inject(Router);

  constructor() {
    this.refreshSession();

    this.supabase.auth.onAuthStateChange((_event, session) => {
      console.log('auth state change');
      this.session.set(session);
    });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.refreshSession();
      });
  }

  async refreshSession() {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();
    this.session.set(session);
    return session;
  }

  async getSession() {
    return await this.supabase.auth.getSession();
  }

  async logout() {
    await this.supabase.auth.signOut();
  }
}
