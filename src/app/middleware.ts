import { NextResponse } from "next/server";

export default function middleware(req: Request) {
  const privateKey = localStorage.getItem("account");
  if (privateKey) {
    return NextResponse.redirect(new URL("/wallet", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/"],
};
