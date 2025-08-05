'use client';

import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
// ****************************************************************************************************
import ParticlesBackground from '@/app/ParticlesBackground';
// ****************************************************************************************************
// ****************************************************************************************************
// ****************************************************************************************************
export default function NotFound() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      position="relative"
      height="100vh"

      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"

      bgcolor="black"
    >
      {/* ✨ Particles */}
      <ParticlesBackground />

      {/* İçerik */}
      <Box
        position="relative"
        textAlign="center"
        maxWidth={isMobile ? 300 : 600}
      >
        <Typography
          variant={isMobile ? 'h3' : 'h1'}
          color="white"
          fontWeight="bold"
          gutterBottom
        >
          404
        </Typography>

        <Typography
          variant={isMobile ? 'body1' : 'h5'}
          color="white"
          gutterBottom
        >
          Page not found
        </Typography>

        <Typography
          variant="body2"
          color="white"
          mb={4}
        >
          The page you are looking for doesn’t exist.
        </Typography>

        <Button
          component={Link}
          href="/"
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'white',
            borderRadius: 7,
            textTransform: 'none',
            px: isMobile ? 2.5 : 3.25,
            py: isMobile ? 1 : 1.25,
            fontSize: isMobile ? '0.875rem' : '1rem',
          }}
        >
          Go back home
        </Button>
      </Box>
    </Box>
  );
}
