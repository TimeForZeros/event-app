'use client';

import { z } from 'zod';
import { login } from '../actions';
import React, { useState } from 'react';
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
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      const { error } = await login(values);
      if (!error) return;
      setErrorMessage(error.message);
    } catch (err) {
        setErrorMessage('Unknown Error');

    }
  };

  return (
    <FormCardWrapper title="Log In">
      <AuthForm form={form} errorMessage={errorMessage} handleAction={handleLogin} />
    </FormCardWrapper>
  );
};

export default LogIn;
