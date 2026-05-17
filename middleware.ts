import {NextRequest, NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/']
}