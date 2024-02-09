## Inserting, Updating and Deleting Data

### Inserting Data

Inserting data looks like this:

```ts
await db.insert(table).values(values);
```

Here is how you would insert rows into `projectTable`:

```ts
await db.insert(projectTable).values({
  name: 'Example project',
});
```

You can insert a row and get it back:

```ts
const row = await db
  .insert(projectTable)
  .values({
    name: 'Example project',
  })
  .returning();
```

This would return something like:

```
[ { id: 3, name: 'Example project' } ]
```

The `returning` function is useful e.g. if you want to get the ID of the inserted row.

You can insert multiple rows by providing an array of objects:

```ts
await db.insert(projectTable).values([
  {
    name: 'Example project',
  },
  { name: 'Another project' },
]);
```

### Updating Data

You can update data using the `db.update` function:

```ts
await db.update(projectTable).set({ name: 'Other project' }).where(eq(projectTable.id, 1));
```

### Deleting Data

You can delete data using the `db.delete` function:

```ts
await db.delete(projectTable).where(eq(projectTable.id, 1));
```
