## Setup

### Creating a Next.js Project

First, we need to create a new Next.js Project.
Here, we simply follow the steps from the Next.js chapter.

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

Note that from now on we specify all paths relative to the `src` directory.
For example if we refer to a file `thingy/example.ts` that file will actually be in `src/thingy/example.ts`.
If you're unsure about the location of a file, you can also look at the end of this section, which contains the file tree you should have after the setup is completed.

### Removing Unneccessary Code

Let's remove all the unneccessary code from the generated files.

Change the file `app/layout.tsx` to look like this:

```jsx
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

Change the file `app/page.tsx` to look like this:

```jsx
export default function Home() {
  return <h1 className="underline">Welcome to easy-opus</h1>;
}
```

Change the file `app/globals.css` to look like this:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Additionally, feel free to delete the SVG files in the `public` directory and to change (or delete) the `favicon`.

Run `pnpm dev` and check out the page at `http://localhost:3000`.
You should see the underlined text `Welcome to easy-opus`.

### Setup a Database

Next we need to setup our database.
To accomplish this, we will simply follow the steps from the SQL chapter.

Create a new Supabase project, copy the database URL and create the following `.env.local` file:

```
DATABASE_URL=$YOUR_DATABASE_URL_HERE
```

> Of course, you need to specify the actual database URL you copied from Supabase instead of `$YOUR_DATABASE_URL_HERE`. Don't forget to replace any special charecters in your password from the final URL: https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding.

### Setup Drizzle

Next, we need to set up Drizzle.
Here we will simply follow the steps from the Drizzle chapter.

Install Drizzle and `dotenv`:

```sh
pnpm add drizzle-orm postgres dotenv
pnpm add --save-dev tsx drizzle-kit
```

Create a new directory called `db`.
This is where our database-related files will go.

> Remember that we specify all paths relative to `src`, i.e. you need to create the `db` directory in `src`.

Now create a directory `db/migrations` to store the migrations.

Create a file `db/drizzle.config.ts`:

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

Next we create a file `db/migrate.ts`:

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

Finally, let's create the initial schema at `db/schema.ts`:

```ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const projectTable = pgTable('project', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

To simplify migrations, we will add the following scripts to `package.json`:

```json
{
  "scripts": {
    // other scripts
    "db:generate": "pnpm drizzle-kit generate:pg --config=src/db/drizzle.config.ts",
    "db:migrate": "pnpm tsx src/db/migrate.ts"
  }
}
```

Now run `pnpm db:generate` to generate the migration.

Inspect the migration (which would be something like `db/migrations/0000_curious_vanisher-sql`) and make sure that it contains the right content:

```sql
CREATE TABLE IF NOT EXISTS "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
```

Run `pnpm db:migrate` to apply the migration to the database.
Verify that your database contains a `project` table with the right columns.

Finally, we create the `db/index.ts` file which exports the `db` object to allow other files to call database functions:

```ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const databaseURL = process.env.DATABASE_URL!;

const client = postgres(databaseURL);
export const db = drizzle(client);
```

> Yes, this subsection was essentially a repeat of things you already learned in the Drzzle chapter.

### Linting

If you look through the scripts in `package.json`, you will see a curious little script called `lint` that executes `next lint`.

This scripts provides an integrated ESLint experience.
ESLint is an awesome tool that statically analyzes your code to quickly find problems.

Note that ESLint is not for finding syntax or type errors (your TypeScript compiler already takes care of that).
Instead it has a lot of rules for good code and bad code and attempts to help you with writing high-quality code.

Let's run it:

```sh
pnpm lint
```

Unless you messed something up, this should output:

```
✔ No ESLint warnings or errors
```

Great!
Currently, ESLint has nothing to tell us.

### File Structure

This is the file structure you should have right now:

```
├── .env.local
├── .eslintrc.json
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── README.md
├── src
│   ├── app
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── db
│       ├── drizzle.config.ts
│       ├── index.ts
│       ├── migrate.ts
│       ├── migrations
│       │   ├── 0000_curious_vanisher.sql
│       │   └── meta
│       │       ├── 0000_snapshot.json
│       │       └── _journal.json
│       └── schema.ts
├── tailwind.config.ts
└── tsconfig.json
```

You _should absolutely understand each and every one of these files_ if you've read the book carefully.

Just to recap:

The `README.md` file contains basic information about the project.

The `package.json` file marks the directory as a JavaScript project and contains vital project information such as the name, the dependencies and the scripts of this project.
The `pnpm-lock.yaml` file is automatically generated by the `pnpm` package manager and contains a complete list of all dependencies (including nested dependencies).
The `node_modules` contain the actual dependencies.

The `tsconfig.json` file marks the directory as a TypeScript project and primarily contains important compiler options for the TypeScript compiler.

The `next.config.mjs` file contains the configuration that is relevant for Next.js.
The `next-env.d.ts` file ensures that Next.js types are picked up by the TypeScript compiler.

The `tailwind.config.ts` file contains the configuration that is relevant for Tailwind CSS.
The `postcss.config.js` file contains the configuration relevant for PostCSS (which is used by Tailwind CSS).

The file `src/app/page.tsx` specifies the root page and `src/app/layout.tsx` specifies the root layout.

The `globals.css` file specifies global styles - right we only really need it for the Tailwind directives.

The `src/db` directory contains everything that is related to the database (including the migrations).

The `.eslintrc.json` contain the `eslint` configuration.

The `.env.local` file contains our enviroment variables.
