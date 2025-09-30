import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export const config = { matcher: ['/dashboard'] };

const middleware = async (req: NextRequest) => {
  const sessionCookie = getSessionCookie(req);
  return sessionCookie ? NextResponse.next() : NextResponse.redirect(new URL('/login', req.url));
};

export default middleware;
