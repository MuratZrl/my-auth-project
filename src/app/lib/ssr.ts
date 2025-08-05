// lib/ssr.ts
import { cookies as getCookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function createServerSupabaseClient() {
  const cookieStore = await getCookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key: string) => cookieStore.get(key)?.value,
        set: () => {},     // Optional, istersen implement edebilirsin
        remove: () => {},  // Optional, istersen implement edebilirsin
      },
    }
  );
}
