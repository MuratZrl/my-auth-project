import * as yup from 'yup';

export const forgotPasswordSchema = yup.object({
  // ****************************************************************************************************
  email: 
    yup.string().email('Invalid email').required('E-mail is required'),

});

export type ForgotPasswordFormValues = yup.InferType<typeof forgotPasswordSchema>;