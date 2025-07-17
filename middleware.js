import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export default async function middleware(request) {


const { pathname } = request.nextUrl;
if(pathname.startsWith('/profile')) {
    const token = await getToken({ req:request  });
if(!token) {
      return NextResponse.redirect(new URL('/login?redirected=profile', request.url));
    }
}
if(pathname.startsWith('/login')) {
  const token = await getToken({req:request})
    const referer = request.headers.get("referer");
  if(token) {
      return NextResponse.redirect(referer ? referer : new URL('/', request.url));
  }
}
  return NextResponse.next();
}

export const config ={
    matcher:['/profile','/login','/']
}