'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { publicAuthenticationEnabled } from '@/lib/launch-scope';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

// D-016: credentials, if ever present, must not activate auth in the informational release.
export const authConfigured = publicAuthenticationEnabled && Boolean(supabaseUrl && supabaseAnonKey);

let persistentClient: SupabaseClient | null = null;
let sessionClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(remember = true): SupabaseClient | null {
  if (!authConfigured || !supabaseUrl || !supabaseAnonKey || typeof window === 'undefined') return null;

  if (remember) {
    persistentClient ??= createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
    return persistentClient;
  }

  sessionClient ??= createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storage: window.sessionStorage },
  });
  return sessionClient;
}
