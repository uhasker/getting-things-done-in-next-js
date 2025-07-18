## Modifying Tables

<div style="text-align: right"> <i> A drop statement is a swift sword; one stroke can sever years of growth. <br> — Ancient Chinese proverb </i> </div>

### The Task Table

Remember that our `task` table looks like this at the moment:

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

### Adding and Dropping Columns

To add a column, we can use the `alter table ... add column` statement.

For example, here is how we can add a `priority` column that has the `text` data type:

```sql
alter table task
add column priority text;
```

When adding a column, we can also specify constraints on it.

For example, here is how we can add a `priority` column with a `check` constraint:

```sql
alter table task
add column priority text
check (priority in ('low', 'medium', 'high'));
```

You can use the `alter table ... drop column` statement to remove a column.

For example, here is how we can drop the `priority` column again:

```sql
alter table task
drop column priority;
```

### Adding and Dropping Constraints

You can add a new constraint to a column using the `alter table ... add constraint` statement.

For example, here is how we can add a `check` constraint to the `duration` column:

```sql
alter table task
add constraint check_duration_max check (duration <= 600);
```

You can drop an existing constraint from a column using the `alter table ... drop constraint` statement.

Let's undo the addition of the `check` constraint:

```sql
alter table task
drop constraint check_duration_max;
```

### Renaming Columns and Tables

You can rename a column using the `alter table ... rename column` statement.

For example, here is how you can rename the column `description` to `details`:

```sql
alter table task
rename column description to details;
```

You can rename an entire table using the `alter table rename ...` statement.

For example, here is how you can rename the `task` table to `task_list`:

```sql
alter table task
rename to task_list;
```

### Removing Tables

You can remove an entire table using the `drop table` statement.

For example, here is how you can remove the `task` table completely:

```sql
drop table task;
```

It hopefully goes without saying that you should be very careful when removing an entire table, as you will also remove all the data it currently stores.
