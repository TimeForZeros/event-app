import NavBar from '../nav-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-12 w-screen">
      <NavBar />
      {children}
    </main>
  );
}
