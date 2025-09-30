import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { ReactNode } from 'react';
import LogOutButton from './(auth)/logout-button';

type LinkButtonProps = {
  href: string;
  children: ReactNode;
};
const LinkButton = ({ href, children }: LinkButtonProps) => (
  <Button asChild className='mx-0.5'>
    <Link href={href}>{children}</Link>
  </Button>
);

const NavBar = () => {
  return (
    <header className='flex justify-center h-12 bg-slate-500 fixed w-screen top-0 items-center'>
      <nav>
        <LinkButton href={'/login'}>Log In</LinkButton>
        <LinkButton href={'/signup'}>Sign Up</LinkButton>
        <LogOutButton />
      </nav>
    </header>
  );
};

export default NavBar;
