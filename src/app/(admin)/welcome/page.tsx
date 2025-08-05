// app/(admin)/welcome/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// **************************************************************************************************************
import { Box, Typography } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
// **************************************************************************************************************
import { motion, useAnimationControls } from 'framer-motion';
// **************************************************************************************************************
import AdminCard from '@/app/(admin)/_components_/ui/AdminCard';
import ConfettiParticles from '@/app/(admin)/_components_/ui/ConfettiBurst';
import CustomButton from '@/app/(admin)/_components_/ui/CustomButton';
// **************************************************************************************************************
import supabase from '@/app/lib/supabaseClient';
// **************************************************************************************************************
// **************************************************************************************************************
// **************************************************************************************************************
export default function WelcomePage() {
  const router = useRouter();
  const controls = useAnimationControls();
  // **************************************************************************************************************
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout failed:', error.message)
      return
    }

    router.push('/login')
  }
  // **************************************************************************************************************
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

  // **************************************************************************************************************
  return (
    <Box
      component={motion.div}
      animate={controls}
      initial={{ backgroundColor: '#1e3c72' }}
      sx={{
        minHeight: '100vh',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
        p: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* 🎉 Confetti */}
      <ConfettiParticles />

      <AdminCard
        title="Admin Panel"
        icon={<SupervisorAccountIcon fontSize="large" />}
      >
        <Typography 
          variant="h3" 
          fontWeight="bold"
        >
          Welcome to my Website!
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ mb: 4 }}
        >
          You have successfully logged in.
        </Typography>

        <CustomButton
          onClick={handleLogout}
          sx={{ px: 3, py: 1.5, color: 'white', borderColor: 'white', borderRadius: 7, textTransform: 'capitalize' }}
        >
          Logout
        </CustomButton>
      </AdminCard>

    </Box>
  );
}
