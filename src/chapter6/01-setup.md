## Setup

### Creating a Next.js Project

Run the following command to create a new Next.js project:

```sh
pnpm create next-app
```

Give your project a name (like `easy-opus`) and select the following options:

- we want to use TypeScript
- we want to use ESLint
- we want to use Tailwind CSS
- we want to use the `src/` directory
- we want to use the App Router
- we don't want to customize the defalt import alias

Next navigate to the `easy-opus` directory and run:

```sh
pnpm dev
```

> Note that `pnpm create next-app` automatically runs `pnpm install`, so you don't need to worry about that.

If you go to `http://localhost:3000`, you will see the default home page.
Let's simplify it a bit for the following sections.

### Simplifying the Default Project

Enter the `src` directory (`easy-opus/src`).

First, remove the `globals.css` file (styles will be the topic of the next chapter).

Next, replace the code in `page.tsx` with this:

```tsx
export default function Home() {
  return <h1>Welcome</h1>;
}
```

Finally, replace the code in `layout.tsx` with this:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Go to `http://localhost:3000` again and observe the simplified home page.
