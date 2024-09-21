import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth(async (req) => {
  const pathname = req.nextUrl.pathname;
  console.log(pathname);

  const isAuth = await auth();
  const isLoginPage = pathname.startsWith("/login");

  const sensitiveRoutes = ["/colorizer"];
  const isAccessingSensitiveRoutes = sensitiveRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isLoginPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/colorizer", req.url));
    }
    return NextResponse.next();
  }
  if (!isAuth && isAccessingSensitiveRoutes) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/", "/login", "/colorizer", "/:path*"],
};
