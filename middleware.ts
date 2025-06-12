import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthService } from "./app/lib/services/auth.service";
import { UserRole } from "./app/lib/types/auth";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuth = !!token;

  // Kimlik doğrulaması gerektirmeyen kısımlar
  const publicPaths = ['/login', '/api/auth'];
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

 // Kimlik doğrulaması gerektiren yollar
  const isProtectedPath = !isPublicPath;

  if (isProtectedPath && !isAuth) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

 // Rol tabanlı erişim
  if (isAuth && token) {
    const authService = AuthService.getInstance();
    const user = {
      id: token.sub as string,
      email: token.email as string,
      role: await authService.getUserRole(token.email as string),
    };

    // Admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!authService.validateUserAccess(user, UserRole.ADMIN)) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  if (isAuth && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
