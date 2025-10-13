import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from './components/app-sidebar';
import NavBar from "../nav-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider >
      <NavBar />
      <AppSidebar />
      <main className='pt-12 w-screen'>
        {children}
      </main>
    </SidebarProvider>
  )
}