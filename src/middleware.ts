

//define protected routes


import { NextRequest, NextResponse } from "next/server";
import {getSessionCookie} from "better-auth/cookies"

const protectedRoutes = ['/profile','/found/add','/found/edit']

export async function middleware(request : NextRequest){
    const pathName = request.nextUrl.pathname
    
    const session = getSessionCookie(request)

    const isProtectedRoute = protectedRoutes.some(route=>pathName.startsWith(route));

    if (isProtectedRoute && !session){
        return NextResponse.redirect(new URL("/auth",request.url))
    }
    //if user is logged in then cant access auth page and redirect to home
    if (pathName=== '/auth' && session){
        return NextResponse.redirect(new URL('/',request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher : ['/profile/:path*','/found/add','/found/edd/:path*','/auth']
}