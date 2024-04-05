# Authentication

The tasks and projects should be "owned" by individual users of our application.
This means that we need to implement authentication.

This used to be very hard, however nowadays there are prebuilt libraries to help us out (at least for the common cases).
We will use a library called Clerk.

Go to `dashboard.clerk.com` and create a new application.

Let's give the application the name `easy-opus`.
You will get a bunch of sign in options, we will select "Email" and "Google".
Click "Create application".

You will see two API keys now, namely `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
You should copy them to the `.env` file.

Next install `@clerk/nextjs`:

```sh
pnpm add @clerk/nextjs
```

Next we will need to add a `<ClerkProvider>` to our app in `layout.tsx`:

```jsx
import { ClerkProvider } from '@clerk/nextjs';

// ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

Now add a `middleware.ts` file (in `src`, not `app/src`):

```jsx
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/'],
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    '/((?!.+\\.[\\w]+$|_next).*)',
    // Re-include any files in the api or trpc folders that might have an extension
    '/(api)(.*)',
  ],
};
```

Next let's create the first version of the homepage `page.tsx`.
If the user is not logged in, we will show the `SignIn` button.
Otherwise we will show a placeholder text:

```jsx
import { db } from '@/db';
import { projectTable } from '@/db/schema';
import { SignIn, auth } from '@clerk/nextjs';
import * as React from 'react';

export default async function Home() {
  const { userId } = auth();

  const projects = await db.select().from(projectTable);

  if (userId === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SignIn />
      </div>
    );
  }

  return <p>Projects will be here</p>;
}
```

Finally, let's add a navbar to every page that will show a `UserButton`.
Modify `layout.tsx`:

```jsx
import { ClerkProvider, UserButton } from '@clerk/nextjs';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Easy Opus',
  description: 'A simple task management application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <nav className="bg-blue-600 bg-opacity-70 text-white p-4 shadow-md flex items-center justify-between">
            <div className="flex justify-center w-full">
              <a href="/" className="text-lg font-bold">
                easy-opus
              </a>
            </div>
            <div className="absolute right-4">
              <UserButton />
            </div>
          </nav>
          <>{children}</>
        </body>
      </html>
    </ClerkProvider>
  );
}
```
