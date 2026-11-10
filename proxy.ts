import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Internal UI kit: never expose it as a public route in a production artifact.
  // Return at the edge before the App Router shell can stream a misleading 200 page.
  if (/^\/(fr|en)\/_kit\/?$/.test(request.nextUrl.pathname)) return new NextResponse(null, { status: 404 });
  return intlMiddleware(request);
}

export const config = { matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'] };
