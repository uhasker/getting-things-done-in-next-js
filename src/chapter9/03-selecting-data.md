## Selecting Data

You can you the `select` function to select data.

You can select all columns:

```ts
await db.select().from(projectTable);
```

Here is how you can specify the columns to select:

```ts
await db.select({ name: projectTable.name }).from(projectTable);
```

You can use the `where` function to filter results.
This function takes one or multiple conditions.

The conditions can contain functions like `eq`, `ne`, `lt`, `lte`, `gt`, `gte`.

For example, here is how you could select all tasks that are in progress:

```ts
await db.select().from(taskTable).where(eq(taskTable.status, 'In progress'));
```

Here is how you can select all tasks that will take longer than 30 minutes:

```ts
await db.select().from(taskTable).where(gt(taskTable.duration, 30));
```

You can use the `and` and `or` functions to combine conditions.
For example, you could select all tasks that are in progress _and_ will take longer than 30 minutes:

```ts
await db
  .select()
  .from(taskTable)
  .where(and(eq(taskTable.status, 'In progress'), gt(taskTable.duration, 30)));
```

You could also select all tasks that are in progress _or_ will take longer than 30 minutes:

```ts
await db
  .select()
  .from(taskTable)
  .where(or(eq(taskTable.status, 'In progress'), gt(taskTable.duration, 30)));
```

You can order the results using `orderBy`.
To specify the ordering, you can use `asc` (ascending) or `desc` (descending):

```ts
await db.select().from(taskTable).orderBy(asc(taskTable.duration));
```

Alternatively:

```ts
await db.select().from(taskTable).orderBy(desc(taskTable.duration));
```

You can limit results using `limit`:

```ts
await db.select().from(taskTable).orderBy(asc(taskTable.duration)).limit(10);
```
