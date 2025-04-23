import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/sign-in", "/sign-up", "/forgotPassword"];

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|fonts|audio).*)"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuth = Boolean(token);
  const isPublicPath = publicPaths.includes(pathname);

  if (!isAuth && !isPublicPath) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuth && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
