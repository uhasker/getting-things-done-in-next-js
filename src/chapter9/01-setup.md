## Setup

<div style="text-align: right"> <i> Skip to the end. Use @tailwindcss. <br> — Kent C. Dodds </i> </div>

### Tailwind CSS and PostCSS

Once you've created an app with `pnpm create next-app`, you're already using Tailwind CSS by default.

If you look at the `package.json` file, you will notice these dependencies:

- `tailwindcss`
- `postcss`
- `autoprefixer`

PostCSS is a special tool for transforming CSS with JavaScript.
Autoprefixer is a PostCSS plugin for parsing CSS and adding vendor prefixes to CSS rules.

Both Tailwind CSS and PostCSS require some configuration.
Luckily, `pnpm create next-app` has already supplied this configuration for us.

You'll find the Tailwind CSS configuration in the `tailwind.config.ts` file:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
```

You'll find the PostCSS configuration in the `postcss.config.js` file:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Tailwind Directives

The final important file is `globals.css`.
If you've created your app with `pnpm create next-app`, this will contain a bunch of unneeded fluff, so let's replace the content of `globals.css` with these lines:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

These lines are so-called **Tailwind directives**.

The `@tailwind base` directive injects Tailwind's base styles in your CSS.

The `@tailwind components` injects Tailwind's component classes in your CSS.

Finally, the `@tailwind utilities` injects Tailwind's utility classes in your CSS.

### A Simple Example

Let's try and use Tailwind CSS now.

We'll add a component with a few Tailwind utility classes to `page.tsx`:

```jsx
export default function Home() {
  return <h1 className="text-3xl font-bold underline">Welcome</h1>;
}
```

Start the development server and open the homepage.
You should see how the styles are applied to the text.

This component highlights the **utility-first** approach to styling that is behind Tailwind CSS.
Instead of writing lots of custom CSS, you style elements by applying pre-existing classes directly in your HTML.

Next, we'll introduce some of the most important utility classes.
