'use client';

import { z } from 'zod';
import { login } from '../actions';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthForm from '../auth-form';
import FormCardWrapper from '../form-card-wrapper';

const loginSchema = z.object({
  email: z.email({ error: 'Invalid Email Format' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters in length')
    .max(256, 'Password exceeds maximum length'),
});

const LogIn = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await login(values);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormCardWrapper title="Log In">
      <AuthForm form={form} handleAction={handleLogin} />
    </FormCardWrapper>
  );
};

export default LogIn;
