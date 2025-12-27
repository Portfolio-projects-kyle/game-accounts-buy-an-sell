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

    // Initialize the Supabase client specifically for Middleware
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
                    // Refresh the response object with the new request headers
                    response = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    /**
     * IMPORTANT:
     * 1. Use getUser() instead of getSession() for security.
     * 2. This refreshes the session if it's expired.
     */
    const { data: { user } } = await supabase.auth.getUser()

    const url = request.nextUrl.clone()

    // --- AUTH LOGIC ---

    const isAuthPage =
        request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/signup');

    const isProtectedRoute =
        request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/sell');

    // A. REDIRECT LOGGED-IN USERS (If they try to access /login or /signup)
    if (isAuthPage && user) {
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    // B. REDIRECT GUESTS (If they try to access protected pages)
    if (isProtectedRoute && !user) {
        url.pathname = '/login'
        // Store the intended destination to redirect back after login
        url.searchParams.set('next', request.nextUrl.pathname)
        return NextResponse.redirect(url)
    }

    return response
}

// 3. MATCHER: Defines which routes this middleware runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (svg, png, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}