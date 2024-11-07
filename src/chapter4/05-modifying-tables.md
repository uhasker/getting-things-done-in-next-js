## Modifying Tables

<div style="text-align: right"> <i> A drop statement is a swift sword; one stroke can sever years of growth. <br> — Ancient Chinese proverb </i> </div>

Remember how our task table looks like right now:

```sql
create table task (
    id serial primary key,
    title text not null,
    description text not null,
    status status,
    duration integer check (duration > 0),
    created_at timestamp default current_timestamp not null
);
```

### Adding and Dropping Columns

To add a column use the `alter table ... add column` statement:

```sql
alter table task add column priority text;
```

You could add constraints here:

```sql
alter table task add column priority text check (priority in ('low', 'medium', 'high'));
```

You can use the `alter table ... drop column` statement to remove a column:

```sql
alter table task
drop column priority;
```

### Adding and Dropping Constraints

You can add a new constraint to a column using the `alter table ... add constraint` statement:

```sql
alter table task
add constraint check_duration_max check (duration <= 600);
```

You can drop an existing constraint to a column using the `alter table ... drop constraint` statement:

```sql
alter table task
drop constraint check_duration_max;
```

### Renaming Columns and Tables

You can rename a column using the `alter table ... rename column` statement:

```sql
alter table task
rename column description to details;
```

You can rename an entire table using the `alter table rename ...` statement:

```sql
alter table task
rename to task_list;
```

### Removing Tables

You can remove an entire table using the `drop table` statement:

```sql
drop table task;
```
