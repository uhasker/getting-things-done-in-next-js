## Setup

### Creating a Next.js Project

First, we need to create a new Next.js Project.
Here, we simply follow the steps from chapter 6.

Run the following command to create a new Next.js project:

```sh
pnpm create next-app
```

Give your project the name `easy-opus` and select the following options:

- we want to use TypeScript
- we want to use ESLint
- we want to use Tailwind CSS
- we want to use the `src/` directory
- we want to use the App Router
- we don't want to customize the defalt import alias

Next, remove all the unneeded things from the files.

Your `layout.tsx` should look like this:

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Easy Opus',
  description: 'A simple task management application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Your `page.tsx` should look like this:

```tsx
export default function Home() {
  return <h1 className="underline">Welcome to Easy Opus</h1>;
}
```

Your `globals.css` should look like this:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Run `pnpm dev` and check that the page looks right.

### Setup Drizzle

Next, we need to setup Drizzle.

Install Drizzle and `dotenv`:

```sh
pnpm add drizzle-orm postgres dotenv
pnpm add --save-dev tsx drizzle-kit
```

Create a directory called `db` in `src`.
This is where our database-related files will go.

Create a directory `migrations` in `db`.
This is where we will store migrations.

Create a file `drizzle.config.ts` (inside `db`):

```ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

Note that `schema` and `out` both specify the path relative to the root directory of our application.
This is because we will run the migrations from our root directory.

Create a file `migrate.ts` (inside `db`):

```ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config();

const databaseURI = process.env.DATABASE_URL;

if (databaseURI === undefined) {
  console.log('You need to provide the database URI');
  process.exit(0);
}

const client = postgres(databaseURI, { max: 1 });
const db = drizzle(client);

async function runMigrations() {
  await migrate(db, { migrationsFolder: './src/db/migrations' });
  await client.end();
}

runMigrations().then(console.log).catch(console.error);
```

Again, pay careful attention to the paths.
The migrations folder is `./src/db/migrations`.

Finally, let's create a `schema.ts`:

```ts
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const taskTable = pgTable('task', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
});
```

If you to run `pnpm drizzle-kit generate:pg` right now, you will get the following error:

```
No config path provided [...]
```

This is because the `drizzle.config.ts` file is no longer in the root directory.
We need to manually specify the location of the config file:

```sh
pnpm drizzle-kit generate:pg --config=src/db/drizzle.config.ts
```

The migration file will appear in `db/migrations`.

Next let's add the `.env` file:

```
DATABASE_URL=...
```

Run:

```sh
pnpm tsx src/db/migrate.ts
```

To simplify future migrations, we will add the following to the `package.json`:

```json
{
  "scripts": {
    "db:generate": "pnpm drizzle-kit generate:pg --config=src/db/drizzle.config.ts",
    "db:migrate": "pnpm tsx src/db/migrate.ts"
  }
}
```

Now all we have to do is to run `pnpm db:generate` to generate a migration and `pnpm db:migrate` to execute a migration.
