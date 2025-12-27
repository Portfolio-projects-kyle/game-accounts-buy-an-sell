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

  // 1. Refresh the session if it's expired (Crucial for security)
  const { data: { user } } = await supabase.auth.getUser()

  // 2. PROTECTED ROUTES LOGIC
  // Add any path here that requires a login
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/dashboard') || 
    request.nextUrl.pathname.startsWith('/sell');

  if (isProtectedRoute && !user) {
    // If no user is found, redirect them to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    // Optional: store the intended destination to redirect back after login
    url.searchParams.set('next', request.nextUrl.pathname) 
    return NextResponse.redirect(url)
  }

  return response
}

// 3. MATCHER: Only run middleware on these specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/data (internal Next.js data fetching)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/data|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}