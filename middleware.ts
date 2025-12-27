// 1. Import Next.js types from 'next/server'
import { NextResponse, type NextRequest } from 'next/server'

// 2. Import Supabase helper from '@supabase/ssr'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Refresh the session if it's expired
  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname;

  // 2. PROTECTED ROUTES LOGIC
  const isProtectedRoute = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/sell');

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    
    // Pass the intended destination
    url.searchParams.set('next', pathname) 

    // Special Logic: If they were trying to sell, add the reason flag
    if (pathname.startsWith('/sell')) {
      url.searchParams.set('reason', 'sell')
    }

    return NextResponse.redirect(url)
  }

  return response
}

// 3. MATCHER
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}