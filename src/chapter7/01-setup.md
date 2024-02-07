## Setup

Once you've created an app with `pnpm create next-app` you are already using Tailwind CSS.

The `package.json` contains these dependencies:

- `tailwindcss`
- `postcss`
- `autoprefixer`

You also have a `tailwind.config.ts` file:

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

You also have a `postcss.config.js`:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Add the following content to the `globals.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Let's try and use Tailwind.
Recreate the setup we used in chapter 6.1.
Then add a few utility classes to `page.tsx`:

```jsx
export default function Home() {
  return <h1 className="text-3xl font-bold underline">Welcome</h1>;
}
```

You should see how the styles are applied to the text.
