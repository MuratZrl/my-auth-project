import * as yup from 'yup';

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'At least one uppercase letter required')
    .matches(/\d/, 'At least one number required'),

  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export type ResetPasswordFormValues = yup.InferType<typeof resetPasswordSchema>;
