## Inserting, Updating and Deleting Data

<div style="text-align: right"> <i> Django had it in 2008 <br> — From Drizzles' official marketing page </i> </div>

### Inserting Data

To insert data in SQL, you use the `insert` statement.
In Drizzle, you can use the appropriately named `insert` function on the `db` object:

```ts
await db.insert(table).values(values);
```

You need to declare the table to write to and the dictionary containing the columns and the values to insert into the respective columns.

For example, here is how you would insert a row into `taskTable`:

```ts
await db.insert(taskTable).values({
  title: 'Read the Next.js book',
  description: 'Read and understand the Next.js book.',
  status: 'inprogress',
  duration: 60,
});
```

You can also insert a row and get it back using the `returning` function.
This is useful if you want to get the data that has been automatically inserted into the database (like an ID):

```ts
const row = await db
  .insert(taskTable)
  .values({
    title: 'Read the Next.js book',
    description: 'Read and understand the Next.js book.',
    status: 'inprogress',
    duration: 60,
  })
  .returning();
console.log(row.id); // Will output the ID of the resulting row
```

You can insert multiple rows at the same by providing an array of objects:

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

To update data in SQL, you use the `update` statement.
In Drizzle, you can use the appropriately named `update` function on the `db` object:

```ts
await db.update(table).set(object).where(condition);
```

You need to specify the table to update, the columns with the values to update, and a condition for which rows to update.

For example, let's say that wanted to set status of the task with the ID `1` to `'done'`:

```ts
await db.update(taskTable).set({ status: 'done' }).where(eq(taskTable.id, 1));
```

Just as with SQL, you can update more than one column at the same time:

```ts
await db.update(taskTable).set({ status: 'done', duration: 0 }).where(eq(taskTable.id, 1));
```

### Deleting Data

To delete data in SQL, you use the `delete` statement.
In Drizzle, you can use the appropriately named `delete` function on the `db` object:

```ts
await db.delete(table).where(condition);
```

You need to specify the table to delete data from as well as a condition that specifies what data to delete.

For example, here is how you could delete all the completed tasks:

```ts
await db.delete(taskTable).where(eq(taskTable.status, 'done'));
```
