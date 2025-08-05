'use client';
export const dynamic = 'force-dynamic';
// ****************************************************************************************************
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// ****************************************************************************************************
import {
  Box,
  Typography,
  Link,
} from '@mui/material'; 
import ShieldIcon from '@mui/icons-material/Shield';
// ****************************************************************************************************
import { resetPasswordSchema, ResetPasswordFormValues } from '@/app/(auth)/_schemas_/ResetPasswordSchemas';
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
export default function ResetPasswordPage() {
  // ****************************************************************************************************
  const router = useRouter()
  // ****************************************************************************************************
  const searchParams = useSearchParams();
  // ****************************************************************************************************
  const { showSnackbar } = useSnackbar();
  // ****************************************************************************************************
  const [loading, setLoading] = useState(false);

  const [allow, setAllow] = useState<boolean | null>(null);
  // ****************************************************************************************************
  const onSubmit = async (formData: ResetPasswordFormValues) => {
    const { password } = formData;

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      showSnackbar(error.message, 'error');
      return;
    }

    showSnackbar('Your password has been changed successfully!', 'success');
  };
  // ****************************************************************************************************
  const { register, handleSubmit, formState: { errors }, } = useForm<ResetPasswordFormValues>({ resolver: yupResolver(resetPasswordSchema), });
  // ****************************************************************************************************
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const type = searchParams.get('type');
    const queryToken = searchParams.get('token');

    const hashParams = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.hash.substring(1))
      : null;

    const access_token = hashParams?.get('access_token') ?? null;
    const refresh_token = hashParams?.get('refresh_token') ?? null;
    const error = hashParams?.get('error');
    const error_code = hashParams?.get('error_code');

    if (error || error_code === 'otp_expired') {
      showSnackbar('The link is invalid or has expired.', 'error');
      router.push('/login');
      return;
    }

    if (queryToken && type === 'recovery') {
      supabase.auth.exchangeCodeForSession(queryToken).then(({ error }) => {
        if (error) {
          showSnackbar('Token error: ' + error.message, 'error');
          router.push('/login');
        } else {
          console.log('✅ Session started with token');
          setAllow(true);
        }
      });
    } else if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token }).then(({ error }) => {
        if (error) {
          showSnackbar('Session error: ' + error.message, 'error');
          router.push('/login');
        } else {
          setAllow(true);
        }
      });
    } else {
      router.push('/login');
    }
    
  }, [showSnackbar, searchParams, router]);

  if (allow === null) {
    return null;
  }

  if (allow === false) {
    return null;
  }
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

            {/* Başlık */}
            <Typography
              variant="h4"
              gutterBottom

              color='white'
              fontWeight={600}

              alignSelf="flex-start"

              sx={{ mb: 1 }}
            >
              Reset Your Password
            </Typography>

            <ShieldIcon sx={{ color: 'white', mb: 1 }} />

          </Box>

          {/* **************************************************************************************************** */}

          <Typography
            variant='subtitle1'
            gutterBottom
            
            color='white'
            fontWeight={500}

            alignSelf={'flex-start'}
          >
            Please enter your new password.
          </Typography>

          {/* **************************************************************************************************** */}

          {/* Pasword Form */}
          <CustomTextField
            required
            label="Password" 

            {...register('password')}
            error={!!errors.password?.message}
          />
          <CustomTextField
            required
            label="Password Repeat"

            {...register('passwordRepeat')}
            error={!!errors.passwordRepeat?.message}
          />

          {/* **************************************************************************************************** */}

          {/* Reset Your Password Button */}
          <CustomButton 
            type='submit'
            loading={loading}
          >
            Reset Your Password
          </CustomButton>


          <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'} width={'100%'} >
            <Link 
              href="/login" 
              sx={{ color: 'white', flexWrap: 'wrap', whiteSpace: 'nowrap' }}
            >
              {'Login'}
            </Link>
          </Box>

        </AuthCard>

    </Box>
  );
}
