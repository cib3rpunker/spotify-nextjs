import dateTime from 'date-time';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { time } from '../lib/utils';

export async function middleware(req) {
  console.log(time, "💙 ~ file: _middleware.js ~ line 6 ~ middleware ~ req: ", req)

  //* The Token will exist if the user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  console.log(time, "💙 ~ file: _middleware.js ~ line 7 ~ middleware ~ token", token)

  const { pathname } = req.nextUrl;

  //* Allow the request if the following is true...
  //* 1) Its a request for next-auth session & provides fetching
  //* 2) if the token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  //* Redirect them to login if they dont have token AND are requesting a protected route
  if(!token && pathname !== '/login'){
    return NextResponse.redirect('/login');
  }
}
