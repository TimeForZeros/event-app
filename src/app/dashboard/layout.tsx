import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './components/app-sidebar';
import NavBar from '../../components/nav-bar';
import LinkButton from '@/components/link-button';
import LogOutButton from '../(auth)/logout-button';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <NavBar>
        <SidebarTrigger />
        <LinkButton href={'/dashboard'}>Home</LinkButton>
        <LogOutButton />
      </NavBar>
      <AppSidebar />
      <main className="pt-12 w-screen">{children}</main>
    </SidebarProvider>
  );
}
