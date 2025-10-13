import type { ReactNode } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

type LinkButtonProps = {
  href: string;
  children: ReactNode;
};
const LinkButton = ({ href, children }: LinkButtonProps) => (
  <Button asChild className="mx-0.5">
    <Link href={href}>{children}</Link>
  </Button>
);

export default LinkButton
