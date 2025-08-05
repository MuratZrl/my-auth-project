// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/welcome'];
const PUBLIC_ROUTES = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;
  const token = cookies.get('sb-access-token')?.value;

  const isProtected = PROTECTED_ROUTES.some(path =>
    nextUrl.pathname.startsWith(path)
  );

  const isPublic = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isProtected && !token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
