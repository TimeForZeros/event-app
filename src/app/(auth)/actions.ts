import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client'; //import the auth client

type LoginDetails = {
  email: string;
  password: string;
  callbackURL?: string;
};
type SignUpDetails = LoginDetails & {
  name: string;
};

export const login = async ({ email, password, callbackURL = '/dashboard' }: LoginDetails) => {
  const res = await authClient.signIn.email(
    {
      email: email,
      password: password,
      callbackURL: callbackURL || './dashboard',
    },
    {
      // onError: () => {
      // },
    },
  );
  return res;
};

export const signUp = async ({
  email,
  password,
  name,
  callbackURL = '/dashboard',
}: SignUpDetails) => {
  const { data, error } = await authClient.signUp.email(
    {
      email,
      password,
      name,
      callbackURL,
    },
    {
      onSuccess: (ctx) => redirect(callbackURL),
      onError: (ctx) => {
        console.log(ctx.error);
        // display the error message
        alert(ctx.error.message);
      },
    },
  );
};

export const logOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => redirect('/login'),
    },
  });
};
