import * as yup from 'yup';

export const registerSchema = yup.object({
  // ****************************************************************************************************
  username: 
    yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username can be maximum 30 characters.'),
  // ****************************************************************************************************
  email: 
    yup.string().email('Invalid email').required('E-mail is required'),
  // ****************************************************************************************************
  password: 
    yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\d/, 'Must contain at least one number'),
  // ****************************************************************************************************
  passwordRepeat: 
    yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please repeat your password'),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;