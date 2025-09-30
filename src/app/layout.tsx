import './globals.css';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import NavBar from './nav-bar';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // if (!session) {
  //   return <div>Not authenticated</div>;
  // }
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
