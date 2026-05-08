import { NextRequest, NextResponse } from "next/server";

const TOKEN_COOKIE = "task_manager_token";
const authPages = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/tasks") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authPages.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/tasks", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/login", "/signup"]
};
