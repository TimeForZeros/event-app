import NavBar from '../../components/nav-bar';
import LinkButton from '@/components/link-button';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-12 w-screen">
      <NavBar>
    <LinkButton href={'/login'}>Log In</LinkButton>
    <LinkButton href={'/signup'}>Sign Up</LinkButton>
      </NavBar>
      {children}
    </main>
  );
}
