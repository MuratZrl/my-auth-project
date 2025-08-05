import * as yup from 'yup';

export const loginSchema = yup.object({
  // ****************************************************************************************************
  email: 
    yup.string().email('Invalid email').required('E-mail is required'),
  // ****************************************************************************************************
  password: yup
    .string()
    .required('Password is required')
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;