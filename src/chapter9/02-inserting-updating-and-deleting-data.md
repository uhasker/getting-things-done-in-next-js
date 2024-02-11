## Inserting, Updating and Deleting Data

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
  status: 'In progress',
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
    status: 'In progress',
    duration: 5000,
  },
  {
    title: 'Write a task app',
    description: 'Write an awesome task app.',
    status: 'Todo',
    duration: 120,
  },
  {
    title: 'Think of a funny joke',
    description: 'Come up with a funny joke to lighten the mood.',
    status: 'In progress',
    duration: 5,
  },
]);
```

### Updating Data

Updating data generally looks like this:

```ts
await db.update(table).set(object).where(condition);
```

For example, let's say that wanted to set status of the task with the ID `1` to `'Completed'`:

```ts
await db.update(taskTable).set({ status: 'Completed' }).where(eq(taskTable.id, 1));
```

### Deleting Data

Updating data generally looks like this:

```ts
await db.delete(table).where(condition);
```

For example, here is how you could delete all the completed tasks:

```ts
await db.delete(taskTable).where(eq(taskTable.status, 'Completed'));
```
