## Setup

Create a new TypeScript project:

```sh
pnpm init
pnpm add typescript --save-dev
pnpm add tsx --save-dev
pnpm tsc --init
```

Install Drizzle:

```sh
pnpm add drizzle-orm postgres
pnpm add drizzle-kit --save-dev
```

Create the following file `demo.ts`:

```ts
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Paste the supabase URI here
const databaseURI = '...';

const projectTable = pgTable('project', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

const client = postgres(databaseURI);
const db = drizzle(client);

async function getProjects() {
  return await db.select().from(projectTable);
}

getProjects().then(console.log);
```

Execute the file:

```sh
pnpm tsx test.ts
```
