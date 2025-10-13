import type { ReactNode } from 'react';

const NavBar = ({ children }: { children: ReactNode }) => {
  return (
    <header className="flex justify-center h-12 bg-slate-500 fixed w-screen top-0 items-center z-10">
      <nav>{children}</nav>
    </header>
  );
};

export default NavBar;
