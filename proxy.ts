import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getCurrentUser } from './services/AuthService';

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ['/login', '/register'];

const roleBasedPrivateRoutes = {
    user: [/^\/user/, /^\/track-agent/, /^\//],
    admin: [/^\/admin/, /^\/create-shop/, /^\/track-agent/, /^\//],
    agent: [/^\/agent/],
};

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const userInfo = await getCurrentUser();

    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        }
    } else {
        if (authRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
        const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
        if (userInfo.role === 'agent') {
            return NextResponse.redirect(
                new URL('/agent/dashboard', request.url),
            );
        }
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/', request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        '/login',
        '/create-shop',
        '/dashboard',
        '/admin/:page',
        '/user',
        '/user/:page',
        '/track-agent',
    ],
};
