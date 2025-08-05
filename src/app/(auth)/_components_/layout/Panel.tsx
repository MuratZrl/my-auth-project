'use client';
import { ReactNode, useEffect } from 'react';
// ******************************************************************************************
import { motion, useAnimation } from 'framer-motion';
// ******************************************************************************************
import { Box, Paper } from '@mui/material';
// ******************************************************************************************
import ParticlesBackground from '@/app/(auth)/_components_/ui/Particles';
import Footer from '@/app/(auth)/_components_/layout/Footer';
// ******************************************************************************************
 
type Props = {
  children: ReactNode;
};

const gradients = [
  '#0d0d1a', // neredeyse siyah gece
  '#1a1a2e', // çok koyu lacivert
  '#16213e', // derin gece mavisi
  '#142850', // loş gece gökyüzü
  '#0d1b2a', // morumsu gece
  '#1e2749', // yıldız fonu gibi
  '#3e497a', // yumuşak gece tonu
  '#2c3e50', // klasik gece grisi
  '#0d0d1a', // tekrar başa dönüş (loop uyumu)
];

const Panel = ({ children }: Props) => {
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      while (true) {
        for (let i = 0; i < gradients.length; i++) {
          const next = gradients[(i + 1) % gradients.length];

          await controls.start({
            background: `linear-gradient(180deg, ${gradients[i]}, ${next})`,
            transition: { duration: 3, ease: 'easeInOut' },
          });
        }
      }
    };

    animate();
  }, [controls]);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }} >

      <motion.div
        animate={controls}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,

          width: '100%',
          height: '100%',
          
          background: `linear-gradient(180deg, ${gradients[0]}, ${gradients[1]})`,
          backgroundSize: '800% 800%',
          zIndex: 0,
        }}
      >

        <Paper
          square
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
          }}
        >

          <ParticlesBackground />

          <Box sx={{ width: '100%', maxWidth: 700 }} >
            {children}
          </Box>

        </Paper>
      </motion.div>

      {/* Footer */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 2,
        }}
      >
        <Footer />
      </Box>

    </Box>
  );
}

export default Panel;