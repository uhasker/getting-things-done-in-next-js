## Pages and Layouts

### Pages

Next.js uses **file-based routing**.
Folders are used to define routes and each folder represents a route segment (which maps to a URL segment).
You can define nested routes by nesting folder inside each other.

For example the folder `about` would represents the route `/about` (which would be mapped to the URL `/about`).
If you would have a folder `about` in inside a folder `company` this would represent the route `/company/about` (which would be mapped to the URL `/company/about`).

Note that all of this is relative to our root directory (which in our application is `src/app`).
This means that the route `/about` would actually be located at `src/app/about` and the route `/company/about` would actually be located at `src/app/company/about`.

Routes can have special files, which are used to actually define the route.
For example, the special `page` file (e.g. `page.js`, `page.jsx` or `page.tsx`) is used to display UI for the given route.
For this to work, the `page` file needs to `default` export a React component.

You already have one of these files - namely `src/app/page.tsx` which defines the UI to be displayed for the route `/`.

Let's create another page.
Add a new directory `about` in `src/app` and create the following file `src/app/about/page.tsx`:

```tsx
export default function About() {
  return <h1>About</h1>;
}
```

Go to `http://localhost:3000/about` and you will see the new page.

> From now on we will stop prefixing everything with `src/app` and simply talk about the "root" directory.

### Layouts

A page is a UI that is unique to a route.
You can also define a UI that is shared between multiple pages.
This is called a **layout**.

You define a layout be `default` exporting a React component from a `layout` file (e.g. `layout.tsx`).
The component should accept a `children` prop that will be populated with a child layout or a child page.

Let's go to `layout.ts` in the root directory, which currently looks like this:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Let's change it to:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>My header</header>
        {children}
      </body>
    </html>
  );
}
```

Now the header `"My header"` will appear on every page (i.e. both on `/` and `/about`).

> After you verified this, you can remove the header again.

Note that the top-most layout (which must always be present) is called the **root layout** and will be shared across all pages.
The root layout must contain `html` and `body` tags.

The root layout is also where you define metadata.
This can be done by exporting a `metadata` object:

```ts
export const metadata: Metadata = {
  title: 'Easy Opus',
  description: 'A task management application',
};
```

### Navigating with the `<Link>` Component

You can add navigation between routes by using the `<Link>` component.

This is a component built on top of the HTML `<a>` tag that you already know.
However this component does some additional things, like prefetching (i.e. preloading routes in the background).
It also changes the way navigation works (we will talk more about this in the next sections).

Here is how you could link the About page from the home page:

```tsx
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Welcome</h1>
      Go to the <Link href="/about">About</Link> page
    </>
  );
}
```
