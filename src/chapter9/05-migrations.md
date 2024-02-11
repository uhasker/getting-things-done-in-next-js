## Migrations

### Why Migrations?

Quite often, during the course of development an application will have to change.
This will sometimes include the underlying tables in the database.

To manage these changes, Drizzle allows you to create **migrations**, i.e. files that can help you update the table schemas.

### Creating Your First Migration

Let's consider the task table without the project IDs.

Create a `schema.ts` file:

```ts
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const taskTable = pgTable('task', {
  id: serial('id').primaryKey(),
  title: text('name').notNull(),
  description: text('description').notNull(),
  status: text('name').notNull(),
});
```

Create a `drizzle.config.ts` file:

```ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts',
  out: '.',
  driver: 'pg',
  dbCredentials: {
    connectionString: '$YOUR_DATABASE_URL_HERE',
  },
} satisfies Config;
```

Now run:

```sh
pnpm drizzle-kit generate:pg
```

This will create a `meta` directory and an SQL file:

```sql
CREATE TABLE IF NOT EXISTS "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" text NOT NULL
);
```

This SQL file contains the migration.
In this example, running the migration will create a new task table with the columns we would expect.

### Run Migrations

Create the `migration.ts` script:

```ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const databaseURI = '$YOUR_DATABASE_URL_HERE';

const client = postgres(databaseURI, { max: 1 });
const db = drizzle(client);

async function runMigrations() {
  await migrate(db, { migrationsFolder: '.' });
  await client.end();
}

runMigrations().then(console.log).catch(console.error);
```

Run the script:

```sh
pnpm tsx migrate.ts
```

You will see that the table now appears in Supabase.

### Read the Database Password from Environment

Of course, in real life, we want to avoid hardcoding the database password in our scripts.
Instead, we will read it from an environment variable.

Change the `migrations.ts` to read the password from `process.env.DATABASE_URL`:

```ts
const databaseURL = process.env.DATABASE_URL;

if (databaseURL === undefined) {
  console.log('You need to provide the database URI');
  process.exit(1);
}
```

Do the same thing with `drizzle.config.ts`:

```ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts',
  out: '.',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
```

Now you can run the script again:

```sh
export DATABASE_URL=$YOUR_DATABASE_URL_HERE
pnpm tsx migrate.ts
```

If you want to get typechecking for `process.env`, you can install `@types/node`:

```sh
pnpm add --save-dev @types/node
```

Alternatively you can read the environment variables from a `.env` file.
Install `dotenv`:

```sh
pnpm add dotenv
```

Create a `.env` file:

```
DATABASE_URL=$YOUR_DATABASE_URL_HERE
```

Add this to the `migrate.ts` script:

```ts
import dotenv from 'dotenv';
dotenv.config();
```

The final migration script now looks like this:

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
  await migrate(db, { migrationsFolder: '.' });
  await client.end();
}

runMigrations().then(console.log).catch(console.error);
```

You can now run:

```ts
pnpm tsx migrate.ts
```

Note that you no longer need to export `DATABASE_URL` manually.
Thanks to `dotenv` the script will simply pick the URL up from the `.env` file.
