'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// ****************************************************************************************************
import Image from 'next/image';
// ****************************************************************************************************
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from '@mui/material/Link';
// ****************************************************************************************************
import { loginSchema, LoginFormValues } from '@/app/(auth)/_schemas_/LoginSchemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// ****************************************************************************************************
import AuthCard from '@/app/(auth)/_components_/ui/AuthCard';
import CustomButton from '@/app/(auth)/_components_/ui/CustomButton';
import CustomTextField from '@/app/(auth)/_components_/ui/CustomTextField';
// ****************************************************************************************************
import { useSnackbar } from '@/app/lib/snackbarContext';
// ****************************************************************************************************
import supabase from '@/app/lib/supabaseClient';
// ****************************************************************************************************
// ****************************************************************************************************
// ****************************************************************************************************
export default function LoginPage() {
  // ****************************************************************************************************
  const router = useRouter();
  // ****************************************************************************************************
  const [showPassword, setShowPassword] = useState(false);
  // ****************************************************************************************************
  const { showSnackbar } = useSnackbar();
  // ****************************************************************************************************
  const [loading, setLoading] = useState(false);
  // ****************************************************************************************************
  const [rememberMe, setRememberMe] = useState(true);
  // ****************************************************************************************************
  const onSubmit = async (formData: LoginFormValues) => {
    const { email, password } = formData;

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 🔴 Remember me check
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }

    setLoading(false);

    // 🔴 not confirmed email error
    if (error) {

      // if not confirmed email:
      if (error.status === 400 && error.message.toLowerCase().includes('confirm')) {
        showSnackbar('Email not confirmed. Sending confirmation link again...', 'warning');

        // ✅ 2. resend confirmation email
        const { error: resendError } = await supabase.auth.resend({ type: 'signup', email, });

        if (resendError) {
          showSnackbar(`Resend failed: ${resendError.message}`, 'error');
        } else {
          showSnackbar('Confirmation email sent again. Please check your inbox.', 'info');
        }

        return;
      }

      // 🔴 others
      showSnackbar(error.message, 'error');
      return;
    }

    showSnackbar('Login successful!', 'success');

    router.push('/welcome');
  };
  // ****************************************************************************************************
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/callback`, // Bu sayfa Google'dan dönüş sayfan olacak
        },
      });

      if (error) {
        console.error('Google login error:', error.message);
      }
    } catch (err) {
      console.error('Unexpected error during Google login:', err);
    }
  };
  // ****************************************************************************************************
  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/callback`, // Bu sayfa Google'dan dönüş sayfan olacak
        },
      });

      if (error) {
        console.error('Github login error:', error.message);
      }
    } catch (err) {
      console.error('Unexpected error during Github login:', err);
    }
  };
  // ****************************************************************************************************
  const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema), });
  // ****************************************************************************************************
  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}

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
            Sign In
          </Typography>

        </Box>

        {/* **************************************************************************************************** */}

        {/* Form */}
        <CustomTextField 
          required
          label="E-mail"
          type='email'

          {...register('email')}
          error={!!errors.email?.message}
        />
        <CustomTextField 
          required
          label="Password" 
          type={showPassword ? 'text' : 'password'}

          {...register('password')}
          error={!!errors.password?.message}

          InputProps={{
            style: { 
              color: 'white', 
              borderRadius: 15, 
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end" sx={{ color: 'white' }} >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* **************************************************************************************************** */}

        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} >

          <Link 
            href="/forgot-password" 
            sx={{ color: 'white', flexWrap: 'wrap', whiteSpace: 'nowrap' }}
          >
            {'Forgot password?'}
          </Link>

          <FormGroup
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              width: '100%',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{
                    color: 'white',
                    '&.Mui-checked': {
                      color: '#ffffffff',
                    },
                  }}
                  
                />
              }
              label="Remember Me"
              sx={{ color: 'white' }}
            />
          </FormGroup>
        </Box>

        {/* **************************************************************************************************** */}

        {/* Sign In Button */}
        <CustomButton type='submit' loading={loading}>
          Sign In
        </CustomButton>

        {/* **************************************************************************************************** */}

        <Typography
          variant='subtitle1'
          alignSelf={'flex-end'}

          color='white'
          fontWeight={500}
        >
          If you don&apos;t have an account {''}
          <Link 
            href="/register" 
            style={{ color: 'white', fontWeight: 600 }}
          >
            {'Sign up now'}
          </Link>
        </Typography>

        {/* **************************************************************************************************** */}
        
        <Divider
          sx={{
            width: '75%',
            color: 'white',
            fontWeight: 600,
            my: 1.25,
            '&::before, &::after': {
              borderColor: 'lightblue',
              opacity: 0.5,
            },
          }}
        >
          OR
        </Divider>

        <Box display="flex" justifyContent="center" alignItems="center" width={'100%'} gap={2} >

          <IconButton onClick={handleGoogleLogin} >
            <Image src="/web_dark_rd_na.svg" alt="Google login" width={32} height={32} draggable={false} />
          </IconButton>

          <IconButton onClick={handleGithubLogin} >
            <Image src="/github-mark.svg" alt="GitHub login" width={32} height={32} draggable={false} />
          </IconButton>

        </Box>

      </AuthCard>

    </Box>
  );
}
