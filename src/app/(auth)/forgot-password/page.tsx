'use client';

import { useState, useEffect } from 'react';
// ****************************************************************************************************
import {
  Box,
  Typography,
  Link,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
// ****************************************************************************************************
import { forgotPasswordSchema, ForgotPasswordFormValues } from '@/app/(auth)/_schemas_/ForgotPasswordSchemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// ****************************************************************************************************
import AuthCard from '@/app/(auth)/_components_/ui/AuthCard';
import CustomTextField from '@/app/(auth)/_components_/ui/CustomTextField';
import CustomButton from '@/app/(auth)/_components_/ui/CustomButton';
// ****************************************************************************************************
import { useSnackbar } from '@/app/lib/snackbarContext';
// ****************************************************************************************************
import supabase from '@/app/lib/supabaseClient';
// ****************************************************************************************************
// ****************************************************************************************************
// ****************************************************************************************************
export default function ForgotPasswordPage() {
  // ****************************************************************************************************
  const { showSnackbar } = useSnackbar();
  // ****************************************************************************************************
  const [cooldown, setCooldown] = useState(0);
  // ****************************************************************************************************
  const [loading, setLoading] = useState(false);
  // ****************************************************************************************************
  const redirectTo = process.env.NEXT_PUBLIC_REDIRECT_URL || 'http://localhost:3000/reset-password';
  // ****************************************************************************************************
  const onSubmit = async (formData: ForgotPasswordFormValues) => {
    const { email } = formData;

    setLoading(true);

    const { error } 
    = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    setLoading(false);

    if (error) {
      showSnackbar(error.message, 'error');

      if (error?.message.includes('wait') || error?.status === 429) {
        setCooldown(60);
        showSnackbar('You must wait 60 seconds before trying again.', 'error');
        return;
      }

      return;
    }

    showSnackbar('Password reset email has been sent!', 'success');
  };
  // ****************************************************************************************************
  const { register, handleSubmit, formState: { errors }, } = useForm<ForgotPasswordFormValues>({ resolver: yupResolver(forgotPasswordSchema), });
  // ****************************************************************************************************
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
  // ****************************************************************************************************
  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}

      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={{ xs: 2, sm: 4 }} // responsive padding
    >

        <AuthCard>

          {/* **************************************************************************************************** */}

          <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'} gap={1.25} >

            {/* Header */}
            <Typography
              variant="h4"
              gutterBottom

              color='white'
              fontWeight={600}

              alignSelf="flex-start"

              sx={{ mb: 1 }}
            >
              Enter Your E-mail
            </Typography>

            <EmailIcon sx={{ color: 'white', mb: 1 }} />

          </Box>

          {/* **************************************************************************************************** */}

          <Typography
            variant='subtitle1'
            gutterBottom
            
            color='white'
            fontWeight={500}

            alignSelf={'flex-start'}
          >
            Please enter your email address and we&apos;ll send you a password reset link.
          </Typography>

          {/* **************************************************************************************************** */}

          {/* E-mail */}
          <CustomTextField
            required
            label="Your E-mail" 
            type='email'

            {...register('email')}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
          />

          {/* **************************************************************************************************** */}

          {/* Send Link Button */}
          <CustomButton
            type='submit'
            loading={loading}
            disabled={cooldown > 0}
          >
            Send Link
          </CustomButton>

          {/* **************************************************************************************************** */}

          <Box display="flex" justifyContent="space-between" alignItems="center" width={'100%'}>
            <Typography 
              variant="body2" 

              alignSelf={'start'}
              color="white"
            >
              Already have an account?{' '}
              <Link href="/login" color="inherit">Sign in</Link>
            </Typography>

            {cooldown > 0 && (
              <Typography variant="body2" color="warning.main" fontWeight={600}>
                Try again in {cooldown}s
              </Typography>
            )}
          </Box>

        </AuthCard>

    </Box>
  );
}
