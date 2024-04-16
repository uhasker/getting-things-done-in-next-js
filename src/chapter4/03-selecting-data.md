## Selecting Data

You can use the `select` statement to select rows from your table.

Here is how you can specify the columns to select:

```sql
select title, status from task;
```

You can also select all columns using the `*` notation:

```sql
select * from task;
```

You can use the `where` clause to filter results.
This clause takes one or multiple conditions.

The conditions can contain operators like `=`, `!=`, `<`, `<=`, `>`, `>=`.

For example, here is how you could select all tasks that are in progress:

```sql
select * from task where status = 'inprogress';
```

Here is how you can select all tasks that will take longer than 30 minutes:

```sql
select * from task where duration > 30;
```

You can use the `like` operator for more complex string comparison.
Here you can use the `%` character to match a sequence of zero or more characters.
You can also use the `_` character to match a single character.

For example, you could match all tasks that contain the sequence "book" somewhere in the description like this:

```sql
select * from task where description like '%book%';
```

You could match all tasks that have any character, followed by the sequence "book" in the title like this:

```sql
select * from task where title like '_book';
```

You can check if a value exists in the list using the `in` operator:

```sql
select * from task where status in ('todo', 'inprogress');
```

You can use the `and` and `or` keywords to combine conditions.
For example, you could select all tasks that are in progress _and_ will take longer than 30 minutes:

```sql
select * from task where status = 'inprogress' and duration > 30;
```

You could also select all tasks that are in progress _or_ will take longer than 30 minutes:

```sql
select * from task where status = 'inprogress' or duration > 30;
```

You can order the results using `order by`.
To specify the ordering, you can use `asc` (ascending) or `desc` (descending):

```sql
select * from task order by duration asc;
```

Alternatively:

```sql
select * from task order by duration desc;
```

You can limit results using `limit`:

```sql
select * from task order by duration desc limit 3;
```

Of course, you can use these together with the `where` clause:

```sql
select * from task where status = 'inprogress' order by duration desc limit 3;
```
