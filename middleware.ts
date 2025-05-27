import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Skip middleware for localhost access in Codespaces
  if (hostname.includes('localhost') && process.env.CODESPACE_NAME) {
    return NextResponse.next();
  }
  
  // In Codespaces (using the public URL), use path-based routing
  const isCodespaces = hostname.includes('github.dev') || hostname.includes('app.github.dev');
  
  if (isCodespaces) {
    if (url.pathname.startsWith('/preview-site/')) {
      const token = url.pathname.split('/')[2];
      url.pathname = `/preview/${token}`;
      return NextResponse.rewrite(url);
    }
    
    if (url.pathname.startsWith('/site/')) {
      const tenant = url.pathname.split('/')[2];
      url.pathname = `/${tenant}${url.pathname.substring(`/site/${tenant}`.length)}`;
      return NextResponse.rewrite(url);
    }
  } else {
    // Handle subdomain routing for production
    if (hostname.includes('-preview.')) {
      const subdomain = hostname.split('.')[0];
      const token = subdomain.replace('-preview', '');
      url.pathname = `/preview/${token}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    
    const currentHost = hostname
      .replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
      .replace('localhost:3000', '')
      .replace('localhost:3001', '');
      
    if (currentHost && currentHost !== 'admin' && currentHost !== 'app' && !currentHost.includes('localhost')) {
      url.pathname = `/${currentHost}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
