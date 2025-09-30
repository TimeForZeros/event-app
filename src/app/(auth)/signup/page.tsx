'use client';

import { z } from 'zod';
import { signUp } from '../actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormCardWrapper from '../form-card-wrapper';
import AuthForm from '../auth-form';

const signUpSchema = z
  .object({
    email: z.email({ error: 'Invalid Email Format' }),
    name: z
      .string()
      .min(1, 'Name must be at least one character in length')
      .max(256, 'Name exceeds maximum length'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters in length')
      .max(256, 'Password exceeds maximum length'),
    confirmPassword: z.string().min(8).max(256),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUp = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });
  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    console.log(values);
    await signUp(values)
  };
  return (
    <FormCardWrapper title="Log In">
      <AuthForm form={form} handleAction={handleSignUp} />
    </FormCardWrapper>
  );
};

export default SignUp;
