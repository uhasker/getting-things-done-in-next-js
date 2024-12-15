## Migrations

<div style="text-align: right"> <i> DrizzleOrm is not an “ORM”, it’s merely a overrated typesafe sql wrapper not even a query builder.  <br> — From Drizzles' official marketing page </i> </div>

### Why Migrations?

Quite often, during the course of development an application will have to change.
This will sometimes include the underlying tables in the database.

The problem is when you need to change the tables, you usually already have some data in those tables which will not match the new table structures.
For example, let's say that you want to add a `finished_at` column to the `tasks` table.
What would you do with the tasks that are already present in the table?
Do you set the `finished_at` value for all those tasks to `null`?
Do you set them to some arbitrary "default" date?

**Database migrations** are sets of changes that allow you to transition a database schema from a current state to a new desired state without breaking your existing data.
These changes can involve adding tables, adding columns, removing columns and even changing data type or constraints.

How do we perform database migrations in practice?
We could theoretically just execute SQL queries that modify our tables and call it a day.
However, in a real project that's a bad idea.

For example, if you execute a mistaken SQL query during a migration you will have no simple way to reverse the change, i.e. to perform a so-called "rollback".
Additionally, you want to be able to allow other developers to reproduce the changes you made to a database, especially if you work with different database instances during development (which is a common practice).

Therefore, most tools (including Drizzle) split the migration process in two separate steps.

First, you need to create a file containing the desired migration.
Second, you need actually execute that file to perform the migration and move your database to the new desired state.

If you want to follow along, you should drop the `task` and `project` tables along with the `status` enum:

```sql
drop table task;
drop table project;
drop type status;
```

You should also delete the `demo.ts` as we will now split the logic across multiple files.

### Creating Your First Migration

Install the `drizzle-kit` package as a dev dependency:

```sh
pnpm add drizzle-kit --save-dev
```

Let's create a `schema.ts` file that will contain all our table definitions.

For now, we will only add the `task` table to it:

```ts
import { pgTable, serial, text, integer, timestamp, check, pgEnum } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const statusEnum = pgEnum('status', ['todo', 'inprogress', 'done']);

export const taskTable = pgTable(
  'task',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    status: statusEnum().notNull(),
    duration: integer('duration'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    {
      durationCheckConstraint: check('duration_check', sql`${table.duration} > 0`),
    },
  ],
);
```

Next, we need to create a `drizzle.config.ts` file.

This file should specify the various configuration options we use when connecting to the database and performing migrations:

```ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './migrations',
  schema: './schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: '$YOUR_DATABASE_URL_HERE',
  },
});
```

Now, we need to generate out first migration file:

```sh
pnpm drizzle-kit generate
```

This will create a `migrations` directory containing `meta` directory and an SQL file with the migration.
It's quite instructive to look inside the SQL file:

```sql
CREATE TYPE "public"."status" AS ENUM('todo', 'inprogress', 'done');
CREATE TABLE "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "status" NOT NULL,
	"duration" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
```

As you can see, a Drizzle migration file simply specifies the SQL queries that should be executed when you perform the migration.
In this example, running the migration will create a new `task` table with the columns we would expect.

### Run Migrations

To run the migration script, we simply need to execute the following command:

```sh
pnpm drizzle-kit migrate
```

You will see that the table now appears in Supabase.

### The Second Migration

Now, let's add the project ID and table to the schema.
Here is how the final `schema.ts` file should look like:

```ts
import { pgTable, serial, text, integer, timestamp, check, pgEnum } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const statusEnum = pgEnum('status', ['todo', 'inprogress', 'done']);

export const projectTable = pgTable('project', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const taskTable = pgTable(
  'task',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    status: statusEnum().notNull(),
    duration: integer('duration'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    projectId: integer('project_id').references(() => projectTable.id),
  },
  (table) => [
    {
      durationCheckConstraint: check('duration_check', sql`${table.duration} > 0`),
    },
  ],
);
```

Next, we create the second migration:

```sh
pnpm drizzle-kit generate
```

This will create another migration file in the `migrations` directory which looks as follows:

```sql
CREATE TABLE "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
ALTER TABLE "task" ADD COLUMN "project_id" integer;
ALTER TABLE "task" ADD CONSTRAINT "task_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;
```

You will see that the migration contains the "diff" between the old schema and the new desired schema.
Namely:

- the migration adds the `project` table
- the migration adds a `project_id` column to the `task` table
- the migration adds the relevant `foreign key` constraint to the `task` table

Finally, you can execute the migration by running `pnpm drizzle-kit migrate`.
This will execute the migration and you should see the updated tables in your Supabase project.

### Read the Database Password from Environment

There is one last thing that we need to fix.

Right now we're hardcoding our database connection URL into our script.

In real life, we want to avoid this to prevent everyone who has access to our code also having access to our database.
Therefore, in practice, we read such secret information from an environment variable.

The change is relatively simple.
All we need to do is to replace the hardcoded database URL in the `drizzle.config.ts` file with `process.env.DATABASE_URL`:

```ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './migrations',
  schema: './schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

Now you just need to export the `DATABASE_URL` environment variable and you can run all the commands as you normally would:

```sh
export DATABASE_URL="$YOUR_DATABASE_URL_HERE"
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

Alternatively, you can read the environment variables from a `.env` file.

To accomplish this, you first need to install the `dotenv` package:

```sh
pnpm add dotenv
```

Next, create a `.env` file:

```
DATABASE_URL=$YOUR_DATABASE_URL_HERE
```

Again, you can run the commands as you usually would:

```sh
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

You can now recreate the `demo.ts` script from the first section:

```ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { taskTable } from './schema';

const db = drizzle(process.env.DATABASE_URL!);

async function getTasks() {
  return await db.select().from(taskTable);
}

getTasks().then(console.log);
```

If you run it with `pnpm tsx demo.ts`, you will get the same results as in the first section.
