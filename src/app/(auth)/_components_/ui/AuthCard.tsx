'use client';

import React from 'react';
// **************************************************************************************************************
import { Card, CardProps } from '@mui/material';
// **************************************************************************************************************
const AuthCard = ({ children, ...props }: CardProps) => {
  return (
    <Card
      sx={{
        p: { xs: 3, sm: 4 },
        width: '100%',
        minWidth: { xs: '100%', sm: 600, md: 800 },

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,

        border: '1px solid rgba(255, 255, 255, 0.25)',
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',

        borderRadius: 7,

        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default AuthCard;
// **************************************************************************************************************