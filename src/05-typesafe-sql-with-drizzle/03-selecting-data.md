## Selecting Data

<div style="text-align: right"> <i> I hate @DrizzleOrm so much that I wrote the Auth.js adapter for it. <br> — From Drizzles' official marketing page </i> </div>

### Basics

We will work with the data that we've inserted in the last section.
As a reminder, this is how it looked like:

```js
insert into task (title, description, duration, status) values
('Read the Next.js book', 'Read and understand the Next.js book.', 60, 'inprogress'),
('Write a task app', 'Write an awesome task app.', 10, 'todo'),
('Think of a funny joke', 'Come up with a funny joke to lighten the mood.', 120, 'inprogress');
```

To select data in SQL, you use the `select` statement.
In Drizzle, you can use the appropriately named `select` function on the `db` object.

You can `select` all columns from a table:

```ts
await db.select().from(taskTable);
```

This would return the following:

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

You can also specify certain columns to `select`:

```ts
await db.select({ title: taskTable.title }).from(taskTable);
```

This would return the following:

```json
[
  { "title": "Read the Next.js book" },
  { "title": "Write a task app" },
  { "title": "Think of a funny joke" }
]
```

### Filtering Results

You can use the `where` function to filter results which works similar to the `where` clause in SQL.
This function takes one or multiple conditions.

The conditions can contain functions like `eq`, `ne`, `lt`, `lte`, `gt`, `gte`.

For example, here is how you could select all tasks that are in progress:

```ts
import { eq } from 'drizzle-orm';

// ...

await db
  .select({
    id: taskTable.id,
    title: taskTable.title,
    status: taskTable.status,
  })
  .from(taskTable)
  .where(eq(taskTable.status, 'inprogress'));
```

This would return the following:

```json
[
  {
    "id": 1,
    "title": "Read the Next.js book",
    "status": "inprogress"
  },
  {
    "id": 3,
    "title": "Think of a funny joke",
    "status": "inprogress"
  }
]
```

Here is how you can select all tasks that will take longer than 30 minutes:

```ts
import { gt } from 'drizzle-orm';

// ...

await db
  .select({
    id: taskTable.id,
    title: taskTable.title,
    duration: taskTable.duration,
  })
  .from(taskTable)
  .where(gt(taskTable.duration, 30));
```

This would return the following:

```json
[
  {
    "id": 1,
    "title": "Read the Next.js book",
    "duration": 60
  },
  {
    "id": 3,
    "title": "Think of a funny joke",
    "duration": 120
  }
]
```

You can use the `and` and `or` functions to combine conditions.
For example, you could select all tasks that are in progress _and_ will take longer than 30 minutes:

```ts
import { and, eq, gt } from 'drizzle-orm';

// ...

await db
  .select({
    id: taskTable.id,
    title: taskTable.title,
    status: taskTable.status,
    duration: taskTable.duration,
  })
  .from(taskTable)
  .where(and(eq(taskTable.status, 'inprogress'), gt(taskTable.duration, 30)));
```

This would return the following:

```json
[
  {
    "id": 1,
    "title": "Read the Next.js book",
    "status": "inprogress",
    "duration": 60
  },
  {
    "id": 3,
    "title": "Think of a funny joke",
    "status": "inprogress",
    "duration": 120
  }
]
```

You could also select all tasks that are in progress _or_ will take longer than 30 minutes:

```ts
import { or, eq, gt } from 'drizzle-orm';

// ...

await db
  .select({
    id: taskTable.id,
    title: taskTable.title,
    status: taskTable.status,
    duration: taskTable.duration,
  })
  .from(taskTable)
  .where(or(eq(taskTable.status, 'inprogress'), gt(taskTable.duration, 30)));
```

This would return the following:

```json
[
  {
    "id": 1,
    "title": "Read the Next.js book",
    "status": "inprogress",
    "duration": 60
  },
  {
    "id": 3,
    "title": "Think of a funny joke",
    "status": "inprogress",
    "duration": 120
  }
]
```

### Ordering and Limiting Results

You can order the results using the `orderBy` function.
To specify the ordering, you can use `asc` (ascending) or `desc` (descending).

For example, this is how you could retrieve all the tasks from the `task` table and sort them by the duration in an ascending order:

```ts
import { asc } from 'drizzle-orm';

// ...

await db
  .select({
    id: taskTable.id,
    title: taskTable.title,
    duration: taskTable.duration,
  })
  .from(taskTable)
  .orderBy(asc(taskTable.duration));
```

This would return:

```json
[
  { "id": 2, "title": "Write a task app", "duration": 10 },
  { "id": 1, "title": "Read the Next.js book", "duration": 60 },
  { "id": 3, "title": "Think of a funny joke", "duration": 120 }
]
```

Alternatively you could order the tasks by the duration in a descending order:

```ts
import { desc } from 'drizzle-orm';

await db
  .select({
    id: taskTable.id,
    title: taskTable.title,
    duration: taskTable.duration,
  })
  .from(taskTable)
  .orderBy(desc(taskTable.duration));
```

You can also limit results using the `limit` function:

```ts
await db
  .select({
    id: taskTable.id,
    title: taskTable.title,
    duration: taskTable.duration,
  })
  .from(taskTable)
  .orderBy(asc(taskTable.duration))
  .limit(2);
```

This would return:

```json
[
  { "id": 2, "title": "Write a task app", "duration": 10 },
  { "id": 1, "title": "Read the Next.js book", "duration": 60 }
]
```

Again, note how similar all these statements are to the statements from the SQL chapter.
