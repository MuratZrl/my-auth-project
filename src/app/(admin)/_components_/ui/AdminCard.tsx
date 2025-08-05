'use client'

import { Card, CardContent, Typography, Box } from '@mui/material'
// **************************************************************************************************************
import { motion } from 'framer-motion'
// **************************************************************************************************************
import { ReactNode } from 'react'
// **************************************************************************************************************
interface AdminCardProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  children?: ReactNode
}
// **************************************************************************************************************
const MotionCard = motion.create(Card)
// **************************************************************************************************************
export default function AdminCard({
  title,
  subtitle,
  icon,
  children,
}: AdminCardProps) {
  return (
    <MotionCard
      elevation={0}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{
        backdropFilter: 'blur(12px)',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 7,
        padding: 3,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2} gap={2}>
          {icon && <Box>{icon}</Box>}
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        {children}
      </CardContent>
    </MotionCard>
  )
}
// **************************************************************************************************************
