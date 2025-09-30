import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from './app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider >
      <AppSidebar />
      <main className='pt-12 w-screen'>
        {children}
      </main>
    </SidebarProvider>
  )
}