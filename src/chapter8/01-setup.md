## Setup

<div style="text-align: right"> <i> What's a Next.js developer's favorite part of setting up a new project? <br> Installing dependencies. It's like Christmas, every package is a surprise! <br> — From "1000 programming dad-jokes" </i> </div>

### Creating a Next.js Project

In this section, we will setup a clean Next.js project for the following sections.

Let's run the following command to create a new Next.js project:

```sh
pnpm create next-app
```

Give your project a name and select the following options:

- we want to use TypeScript
- we want to use ESLint
- we want to use Tailwind CSS
- we want to use the `src/` directory
- we want to use the App Router
- we want to use Turbopack for `next dev`
- we don't want to customize the default import alias

```sh
pnpm dev
```

> Note that `pnpm create next-app` automatically runs `pnpm install`, so you don't need to worry about that.

If you go to `http://localhost:3000`, you will see the default home page.
But where is this home page coming from?

Looking at our new Next.js project, we will see the following layout:

```
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
├── README.md
├── src
│   └── app
│       ├── ...
│       ├── layout.tsx
│       └── page.tsx
├── tailwind.config.ts
└── tsconfig.json
```

Crucially, our code is contained in `src/app` and our home page is located at `src/app/page.tsx`.
Let's clean it up a bit.

### Simplifying the Default Project

Enter the `src/app` directory.

First, remove the `globals.css` file (styles will be the topic of the next chapter).

Next, replace the code in `page.tsx` with this:

```jsx
export default function Home() {
  return <h1>Welcome</h1>;
}
```

Finally, replace the code in `layout.tsx` with this:

```jsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Go to `http://localhost:3000` again and observe the simplified home page.
