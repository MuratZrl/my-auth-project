'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// ****************************************************************************************************
import {
  Box,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from '@mui/material/Link';
// ****************************************************************************************************
import { registerSchema, RegisterFormValues } from '@/app/(auth)/_schemas_/RegisterSchemas';
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
export default function RegisterPage() {
  // ****************************************************************************************************
  const router = useRouter();
  // ****************************************************************************************************
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  // ****************************************************************************************************
  const { showSnackbar } = useSnackbar();
  // ****************************************************************************************************
  const [loading, setLoading] = useState(false);
  // ****************************************************************************************************
  const onSubmit = async (formData: RegisterFormValues) => {
    const { email, password, passwordRepeat } = formData;

    if (password !== passwordRepeat) {
      showSnackbar('Passwords do not match', 'error');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          username: formData.username,
        },
      },
    });

    setLoading(false);

    if (error) {
      showSnackbar(error.message, 'error');

      return;
    }


    showSnackbar("We've been sent an confirmation link to your email address.", 'success');

    router.push('/login');
  };
  // ****************************************************************************************************
  const { register, handleSubmit, formState: { errors }, } = useForm<RegisterFormValues>({ resolver: yupResolver(registerSchema), });
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
              Sign Up
            </Typography>

          </Box>

          {/* **************************************************************************************************** */}

          {/* Form */}
          <CustomTextField
            required
            label="Username" 
            type='text'
            
            {...register('username')}
            error={!!errors.username?.message}
            helperText={errors.username?.message}
          />
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
          <CustomTextField
            required
            label="Password Repeat"
            type={showPasswordRepeat ? 'text' : 'password'}

            {...register('passwordRepeat')}
            error={!!errors.passwordRepeat?.message}

            InputProps={{
              style: { 
                color: 'white', 
                borderRadius: 15, 
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPasswordRepeat(prev => !prev)} edge="end" sx={{ color: 'white' }} >
                    {showPasswordRepeat ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* **************************************************************************************************** */}

          {/* Sign Up Button */}
          <CustomButton type='submit' loading={loading }>
            Sign Up
          </CustomButton>

          <Typography
            variant='subtitle1'
            alignSelf={'flex-end'}
            color='white'
            fontWeight={500}
            display="flex"
            alignItems="center"
            gap={1}
          >
            
            If you have an account{' '}
            <Link href="/login" color="inherit">
              {'Sign In now'}
            </Link>
          </Typography>

        </AuthCard>

    </Box>
  );
}
