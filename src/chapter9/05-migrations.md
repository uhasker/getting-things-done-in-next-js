## Migrations

### Why Migrations?

TODO

### Creating Your First Migration

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

Create the `drizzle.config.ts` file:

```ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts',
  out: '.',
  driver: 'pg',
  dbCredentials: {
    connectionString: '...',
  },
} satisfies Config;
```

Now run:

```sh
pnpm drizzle-kit generate:pg
```

This will create a `meta` directory and an `sql` file:

```sql
CREATE TABLE IF NOT EXISTS "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" text NOT NULL
);
```

### Run Migrations

Create the `migration.ts` script:

```ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const databaseURI = '...';

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

### Read the Database Password from Environment

Install:

```sh
pnpm add --save-dev @types/node
```

Now change the script:

```ts
const databaseURI = process.env.DATABASE_URL;

if (databaseURI === undefined) {
  console.log('You need to provide the database URI');
  process.exit(1);
}
```

Now do:

```sh
export DATABASE_URL=...
```

Alternatively you can read the environment variables from the `.env` file.
Install `dotenv`:

```sh
pnpm add dotenv
```

Create a `.env` file:

```
DATABASE_URL=...
```

Add this to the `migrate.ts` script:

```ts
import dotenv from 'dotenv';
dotenv.config();
```
