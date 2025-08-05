'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// ****************************************************************************************************
import { Box, CircularProgress } from '@mui/material';
// ****************************************************************************************************
import supabase from '@/app/lib/supabaseClient';
// ****************************************************************************************************
// ****************************************************************************************************
// ****************************************************************************************************
export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace('/welcome');
      } else {
        router.replace('/login');
      }
    };

    checkSession();
  }, [router]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  );
}
