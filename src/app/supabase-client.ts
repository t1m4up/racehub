import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'src/supabase/database.types';

export type SupabaseClientType = SupabaseClient<Database>;

function createSupabaseClient() {
  return createBrowserClient<Database>(
    import.meta.env['VITE_PUBLIC_SUPABASE_URL'],
    import.meta.env['VITE_PUBLIC_SUPABASE_ANON_KEY']
  );
}

const SUPABASE_CLIENT = new InjectionToken<SupabaseClientType>(
  'SUPABASE_CLIENT',
  {
    factory: () => createSupabaseClient() as any,
  }
);

export function provideSupabaseClient(): FactoryProvider {
  return {
    provide: SUPABASE_CLIENT,
    useFactory: () => createSupabaseClient(),
  };
}

export function injectSupabaseClient() {
  return inject(SUPABASE_CLIENT);
}
