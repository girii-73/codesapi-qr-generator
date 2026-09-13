import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser-safe Supabase client (anon key).
 * Lazily created so module evaluation doesn't crash when env vars are missing
 * (e.g. at build time).
 */
let _browserClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_browserClient) return _browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  _browserClient = createClient(url, anonKey);
  return _browserClient;
}

/**
 * Server-only Supabase client (service role key — bypasses RLS).
 * Creates a fresh client each call to avoid cross-request contamination.
 */
export function createServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
  }
  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
  }

  return createClient(url, serviceRoleKey);
}
