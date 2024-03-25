## Setup

<div style="text-align: right"> <i> Astro DB is powered by Drizzle! <br> ... and we regret everything omg this thing sucks <br> - From Drizzles official page </i> </div>

### A Simple Example

Let's create a simple Drizzle script that will declare a task table and read all the tasks from the table.

Create a new supabase database and recreate the task table from the SQL chapter.
Don't add the project IDs yet, that will follow later.

Create a new TypeScript project:

```sh
pnpm init
pnpm add typescript tsx --save-dev
pnpm tsc --init
```

Install Drizzle:

```sh
pnpm add drizzle-orm postgres
pnpm add drizzle-kit --save-dev
```

Create the following file `demo.ts`:

```ts
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Paste the supabase URI here
const databaseURI = '...';

// Declare the task table
export const taskTable = pgTable('task', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
  duration: integer('duration').notNull(),
});

const client = postgres(databaseURI);
const db = drizzle(client);

async function getTasks() {
  return await db.select().from(taskTable);
}

getTasks().then(console.log);
```

Execute the file:

```sh
pnpm tsx demo.ts
```

You will see a list of all the tasks that are currently present in the table.

### Drizzle as Typesafe SQL

Did you notice how similar the Drizzle function and the SQL statement are?
The Drizzle function is:

```ts
db.select().from(taskTable);
```

The SQL function was:

```sql
select * from task;
```

This similarity is _intentional_ and will be a major theme in this chapter.
Unlike many other frameworks which try to "abstract" SQL away, Drizzle embraces SQL and only adds a bit of type safety on top of it.

If you know SQL, learning Drizzle is a very fast process.
