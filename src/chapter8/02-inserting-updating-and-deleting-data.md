## Inserting, Updating and Deleting Data

### Inserting Data

To insert rows into a table, you use the `insert` statement.
Here you need to declare the table to write to, the columns to fill and one or more rows of data to insert:

```sql
insert into task (title, description, duration, status) values
('Read the Next.js book', 'Read and understand the Next.js book.', 60, 'inprogress'),
('Write a task app', 'Write an awesome task app.', 0, 'todo'),
('Think of a funny joke', 'Come up with a funny joke to lighten the mood.', 120, 'inprogress');
```

Note that do not need to include the `id` and `created_at` column values.

After all, the `id` value has the `serial` data type, so PostgreSQL will automatically create new values for this column.
Additionally, the `created_at` column has a `default` constraint, so PostgreSQL will automatically create new values for this column too.

It's crucial to ensure that the inserted data respects the constraints we defined earlier.

For example, we need to respect the `check` constraint on the `status` column:

```sql
insert into task (title, description, duration, status) values
('Read the Next.js book', 'Read and understand the Next.js book', 60, 'invalid');
```

The given statement would result in the following error:

```
ERROR:  23514: new row for relation "task" violates check constraint "task_status_check"
```

We would get a similar error if we would try to insert a `null` value into a column that declares a `not null` constraint:

```sql
insert into task (title, description, duration, status) values
('Read the Next.js book', null, 60, 'todo');
```

Now we would get the following error:

```
ERROR:  23502: null value in column "description" of relation "task" violates not-null constraint
```

### Updating Data

You can update rows using the `update` statement.
Here you need to specify which table, which columns and which rows to update:

```sql
update task
set status = 'done'
where id = 1;
```

You can also update more than one column at the same time:

```sql
update task
set status = 'done', duration = 0
where id = 1;
```

You should be very careful when updating data.
If you make a mistake in the `where` clause you can update rows that you never intended to change.

### Deleting Data

You can delete rows using the `delete` statement.
Here you need to specify which table to use and which rows to remove:

```sql
delete from task
where status = 'done';
```

Again, you should be very careful when deleting data.
If you make a mistake in the `where` clause you can delete rows that you never intended to remove.
