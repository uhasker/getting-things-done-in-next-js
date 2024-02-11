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

Next, remove all the unneeded code from the generated files.
Note that we specify all paths relative to the `src` directory.
If you are unsure about where a file should go, you can look at the end of this section, which contains the file tree you should have after the setup is completed.

The file `app/layout.tsx` should look like this:

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

The file `app/page.tsx` should look like this:

```jsx
export default function Home() {
  return <h1 className="underline">Welcome to Easy Opus</h1>;
}
```

The file `app/globals.css` should look like this:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Run `pnpm dev` and check out the page at `http://localhost:3000`.

Also feel free to delete the SVG files in the `public` directory.
You should also change (or delete) the `favicon`.

### Setup a Database

Just follow the steps from the SQL chapter.

Create a new Supabase project, copy the database URL and create the following `.env` file:

```
DATABASE_URL=$YOUR_DATABASE_URL_HERE
```

> Of course, you need to specify the actual database URL you copied from Supabase instead of `$YOUR_DATABASE_URL_HERE`.

### Setup Drizzle

Next, we need to set up Drizzle.

Install Drizzle and `dotenv`:

```sh
pnpm add drizzle-orm postgres dotenv
pnpm add --save-dev tsx drizzle-kit
```

Create a new directory called `db`.
This is where our database-related files will go.

> Remember that we specify all paths relative to `src`, i.e. you need to create the `db` directory in `src`.

Now create a directory `db/migrations`.
This is where we will store our migrations.

Next, we need to create the files needed by Drizzle.
This is very similar to the setup from the Drizzle chapter.

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

Here you need to be _careful_.
The properties `schema` and `out` both have to specify the path _relative to the root directory of our application_.
This is because we will run the migrations from our root directory.

If you set `schema` to just `./schema.ts` (or even `./db/schema.ts`), you will get errors.
Setting the wrong file paths is the most common problem when performing the Drizzle setup, so watch out for that.

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

Again, pay careful attention to the paths.
The migrations folder is path `./src/db/migrations`, _not_ `./migrations` or `./db/migrations`.

Finally, let's create the schema at `db/schema.ts`:

```ts
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const taskTable = pgTable('task', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
});
```

If you to run `pnpm drizzle-kit generate:pg` from the root directory right now, you will get the following error:

```
No config path provided [...]
```

This is because the `drizzle.config.ts` file is no longer in the root directory.
Therefore we need to manually specify the location of the config file using the `--config` option:

```sh
pnpm drizzle-kit generate:pg --config=src/db/drizzle.config.ts
```

The migration file will now appear in `db/migrations`.

We can now execute the migration:

```sh
pnpm tsx src/db/migrate.ts
```

To simplify future migrations, we will add the following script to `package.json`:

```json
{
  "scripts": {
    "db:generate": "pnpm drizzle-kit generate:pg --config=src/db/drizzle.config.ts",
    "db:migrate": "pnpm tsx src/db/migrate.ts"
  }
}
```

Now all we have to do is to run `pnpm db:generate` to generate a migration and `pnpm db:migrate` to execute a migration.

Finally, we create the `db/index.ts` file which exports the `db` object.
This allows other files to call database functions:

```ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const databaseURL = process.env.DATABASE_URL!;

const client = postgres(databaseURL);
export const db = drizzle(client);
```

### File Structure

This is the file structure you should have right now:

```
├── next.config.mjs
├── next-env.d.ts
├── node_modules
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
│       │   ├── 0000_moaning_doctor_doom.sql
│       │   └── meta
│       │       ├── 0000_snapshot.json
│       │       └── _journal.json
│       └── schema.ts
├── tailwind.config.ts
└── tsconfig.json
```

You _should absolutely understand each and every one of these files_ if you read the book carefully.

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

The `globals.css` file specifies global styles - right now it's needed for the Tailwind directives.

The `src/db` directory contains everything that is related to the database (including the migrations).
