## Inserting, Updating and Deleting Data

### Inserting Data

To insert rows into a table, you use the `insert` statement.
Here you need to declare the table to write to, the columns to fill and one or more rows of data to insert:

```sql
insert into task (id, title, description, duration, status) VALUES
(1, 'Read the Next.js book', 'Read and understand the Next.js book.', 60, 'In progress'),
(2, 'Write a task app', 'Write an awesome task app.', 0, 'Todo'),
(3, 'Think of a funny joke', 'Come up with a funny joke to lighten the mood.', 120, 'In progress');
```

### Updating Data

You can update rows using the `update` statement.
Here you need to specify which table, which columns and which rows to update:

```sql
update task
set status = 'Completed'
where id = 1;
```

## Deleting Data

You can delete rows using the `delete` statement.
Here you need to specify which table to use and which rows to remove:

```sql
delete from task
where status = 'Completed';
```
