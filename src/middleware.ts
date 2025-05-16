import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const publicPaths = new Set(["/sign-in", "/sign-up", "/forgotPassword"]);
const intlMiddleware = createIntlMiddleware(routing);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|fonts|audio|api|trpc|_vercel|.*\\..*).*)",
  ],
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const isAuth = Boolean(token);

  if (publicPaths.has(pathname)) {
    if (!isAuth) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\-[A-Z]{2})?\//, "/");
  if (!isAuth && !publicPaths.has(pathWithoutLocale)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return intlMiddleware(request);
}
