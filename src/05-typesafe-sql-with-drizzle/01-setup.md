## Setup

<div style="text-align: right"> <i> Astro DB is powered by Drizzle! <br> ... and we regret everything omg this thing sucks <br> — From Drizzles' official marketing page </i> </div>

### A Simple Example

Create a new Supabase database and recreate the `task` table from the SQL chapter:

```sql
create type status as enum ('todo', 'inprogress', 'done');

create table task (
    id serial primary key,
    title text not null unique,
    description text not null,
    status status,
    duration integer check (duration > 0),
    created_at timestamp default current_timestamp not null
);
```

Let's also insert some values into the `task` table:

```sql
insert into task (title, description, duration, status) values
('Read the Next.js book', 'Read and understand the Next.js book.', 60, 'inprogress'),
('Write a task app', 'Write an awesome task app.', 10, 'todo'),
('Think of a funny joke', 'Come up with a funny joke to lighten the mood.', 120, 'inprogress');
```

Don't add the `project` table yet, that will come later.

Before we can write code, we need to setup Drizzle.

First, we have to initialize a new TypeScript project and also add a `tsconfig.json` file.
You already know the relevant commands from the TypeScript chapter:

```sh
pnpm init
pnpm add typescript tsx --save-dev
pnpm tsc --init
```

Next, we have to install Drizzle.
The core package is called `drizzle-orm`.
We will also need the `pg` package to be able to interact with our PostgreSQL database.

```sh
pnpm add drizzle-orm pg
```

We will also need the `@types/pg` package to get the type definitions for `pg`:

```sh
pnpm add @types/pg --save-dev
```

Create the following file `demo.ts`:

```ts
import {
  pgTable,
  pgEnum,
  serial,
  text,
  integer,
  timestamp,
  varchar,
  check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';

// Paste the supabase URI here
const databaseURI = '...';

const statusEnum = pgEnum('status', ['todo', 'inprogress', 'done']);

// Declare the task table
const taskTable = pgTable(
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

// Connect Drizzle to the database
const db = drizzle(databaseURI);

// Execute a query
async function getTasks() {
  return await db.select().from(taskTable);
}

getTasks().then(console.log);
```

> Note that hardcoding passwords and secrets in code is really poor style.
> We will fix this at the end of this chapter.

There are two really important functions that Drizzle provides for you.

First, we have the `pgTable` function.
This declares a table schema and allows you to map the underneath SQL table to JavaScript (or TypeScript) objects.

Second, we have the `drizzle` function.
This allows you to establish the actual connection to the database and serves as the entry point for all your database interactions.
It returns a `db` object that represents the Drizzle client and allows you execute the actual queries (like `db.select().from(taskTable)`).

Execute the file:

```sh
pnpm tsx demo.ts
```

You will see a list of all the tasks that are currently present in the table:

```json
[
  {
    "id": 1,
    "title": "Read the Next.js book",
    "description": "Read and understand the Next.js book.",
    "status": "inprogress",
    "duration": 60,
    "createdAt": "2024-12-15T10:49:46.049Z"
  },
  {
    "id": 2,
    "title": "Write a task app",
    "description": "Write an awesome task app.",
    "status": "todo",
    "duration": 10,
    "createdAt": "2024-12-15T10:49:46.049Z"
  },
  {
    "id": 3,
    "title": "Think of a funny joke",
    "description": "Come up with a funny joke to lighten the mood.",
    "status": "inprogress",
    "duration": 120,
    "createdAt": "2024-12-15T10:49:46.049Z"
  }
]
```

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

This similarity is quite intentional and will be a major theme in this chapter.
Unlike many other frameworks which try to "abstract" SQL away, Drizzle embraces SQL and only adds a bit of type safety on top of it.

If you know SQL, learning Drizzle is a very fast process.
