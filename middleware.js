export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/feeds/:path*", "/market/:path*", "/profile/:path*"],
};
