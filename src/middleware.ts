import { NextResponse, type NextRequest } from 'next/server';
import { BLOCKED_SCRAPER_UA } from '@/lib/security/headers';

const SEARCH_BOTS = /googlebot|bingbot|duckduckbot|slurp|yandexbot/i;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') ?? '';

  if (SEARCH_BOTS.test(userAgent)) {
    return NextResponse.next();
  }

  if (BLOCKED_SCRAPER_UA.test(userAgent)) {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
