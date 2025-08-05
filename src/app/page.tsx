// app/page.tsx (veya herhangi bir korumalı route)
'use server'
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/app/lib/ssr';

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // Giriş yapılmışsa /welcome sayfasına yönlendir
    redirect('/welcome')
  } else {
    // Giriş yapılmamışsa login sayfasına yönlendir
    redirect('/login')
  }
}
