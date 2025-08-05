'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAnimationControls } from 'framer-motion';
import supabase from '@/app/lib/supabaseClient';

export function useWelcomePageLogic() {
  const router = useRouter();
  const controls = useAnimationControls();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout failed:', error.message);
      return;
    }
    router.push('/login');
  };

  useEffect(() => {
    const loopColors = async () => {
      const colors = ['#1e3c72', '#581c4fff', '#134f69ff', '#0c4af5ff'];
      let index = 0;

      while (true) {
        await controls.start({
          backgroundColor: colors[index],
          transition: { duration: 15 },
        });
        index = (index + 1) % colors.length;
      }
    };

    loopColors();
  }, [controls]);

  return { controls, handleLogout };
}
