import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { routeAccessMap } from './lib/settings';
import { NextResponse } from 'next/server';


// const isProtectedRoute = createRouteMatcher(['/admin(.*)', '/teacher(.*)'])

const matchers = Object.keys(routeAccessMap).map(route=>({
  matcher: createRouteMatcher([route]),
  allowRoles: routeAccessMap[route]
}))
console.log(matchers)

export default clerkMiddleware(async (auth, req) => {
  // if (isProtectedRoute(req)) await auth.protect()
  const {sessionClaims} = (await auth());

  // if (!sessionClaims) {
  //   return new Response('Unauthorized', { status: 401 });
  // }

  const role = (sessionClaims?.metadata as {role?: string})?.role 
  
  for (const {matcher, allowRoles} of matchers) {
    if (matcher(req) && !allowRoles.includes(role!)) {  
        return  NextResponse
        .redirect(new URL(`/${role}`, req.url));     
    }
  }
  
}, )

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};