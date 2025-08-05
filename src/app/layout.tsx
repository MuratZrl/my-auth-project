// app/layout.tsx

import './globals.css';
// ****************************************************************************************************
import type { Metadata } from 'next';
import { Box } from '@mui/material';
// ****************************************************************************************************
import { Analytics } from '@vercel/analytics/react';
// ****************************************************************************************************
export const metadata: Metadata = {
  title: {
    default: 'My Auth App',
    template: '%s | My Auth App',
  },
  description: 'Secure login and authentication system.',
  robots: {
    index: false,
    follow: false,
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Box>
          {children}
        </Box>
        <Analytics />
      </body>
    </html>
  );
}
// ****************************************************************************************************