import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/clerk(.*)', // Add public API routes here
]);

export default clerkMiddleware(async (auth, req) => {
  console.log(`Incoming request to: ${req.nextUrl.pathname}`);

  if (isPublicRoute(req)) {
    console.log(`Public route accessed: ${req.nextUrl.pathname}`);
    return;
  }

  console.log(`Protected route accessed: ${req.nextUrl.pathname}`);
  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};