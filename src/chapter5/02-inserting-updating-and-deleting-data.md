## Inserting, Updating and Deleting Data

<div style="text-align: right"> <i> Django had it in 2008 <br> - From Drizzles official page </i> </div>

### Inserting Data

Inserting data generally looks like this:

```ts
await db.insert(table).values(values);
```

Here is how you would insert a row into `taskTable`:

```ts
await db.insert(taskTable).values({
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
  status: 'inprogress',
  duration: 60,
});
```

You can insert a row and get it back:

```ts
const row = await db
  .insert(taskTable)
  .values({
    name: 'Example project',
  })
  .returning();
```

This would return something like:

```
[ { id: 3, name: 'Example project' } ]
```

The `returning` function is mostly useful if you want to get the ID of the inserted row.

You can insert multiple rows by providing an array of objects:

```ts
await db.insert(taskTable).values([
  {
    title: 'Read the Next.js book',
    description: 'Read and understand the Next.js book.',
    status: 'inprogress',
    duration: 5000,
  },
  {
    title: 'Write a task app',
    description: 'Write an awesome task app.',
    status: 'todo',
    duration: 120,
  },
  {
    title: 'Think of a funny joke',
    description: 'Come up with a funny joke to lighten the mood.',
    status: 'inprogress',
    duration: 5,
  },
]);
```

### Updating Data

Updating data generally looks like this:

```ts
await db.update(table).set(object).where(condition);
```

For example, let's say that wanted to set status of the task with the ID `1` to `'done'`:

```ts
await db.update(taskTable).set({ status: 'done' }).where(eq(taskTable.id, 1));
```

### Deleting Data

Updating data generally looks like this:

```ts
await db.delete(table).where(condition);
```

For example, here is how you could delete all the completed tasks:

```ts
await db.delete(taskTable).where(eq(taskTable.status, 'done'));
```
