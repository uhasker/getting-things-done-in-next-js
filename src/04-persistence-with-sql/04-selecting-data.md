## Selecting Data

<div style="text-align: right"> <i> A query without limits is like a river without banks — overflowing and uncontrollable. <br> — Ancient Chinese proverb </i> </div>

### Basics

We will continue working with the inserted data from the last section.
As a reminder, this was the data that we've inserted:

```sql
insert into task (title, description, duration, status) values
('Read the Next.js book', 'Read and understand the Next.js book.', 60, 'inprogress'),
('Write a task app', 'Write an awesome task app.', 10, 'todo'),
('Think of a funny joke', 'Come up with a funny joke to lighten the mood.', 120, 'inprogress');
```

You can use the `select` statement to select rows from your table.

Here is how you can specify which columns to retrieve during selection:

```sql
select title, status from task;
```

This would return:

```
| title                 | status     |
| --------------------- | ---------- |
| Read the Next.js book | inprogress |
| Write a task app      | todo       |
| Think of a funny joke | inprogress |
```

You can also select all columns using the `*` notation:

```sql
select * from task;
```

This would return:

```
| id | title                 | description                                    | status     | duration | created_at                 |
| -- | --------------------- | ---------------------------------------------- | ---------- | -------- | -------------------------- |
| 1  | Read the Next.js book | Read and understand the Next.js book.          | inprogress | 60       | 2024-04-19 14:26:44.726311 |
| 2  | Write a task app      | Write an awesome task app.                     | todo       | 10       | 2024-04-19 14:26:44.726311 |
| 3  | Think of a funny joke | Come up with a funny joke to lighten the mood. | inprogress | 120      | 2024-04-19 14:26:44.726311 |
```

### Filtering Results

You can use the `where` clause to filter the results that are returned by the `select` statement.
The `where` clause takes one or multiple conditions.

The conditions can contain operators like `=`, `!=`, `<`, `<=`, `>`, `>=`.

For example, here is how you can select all tasks that are in progress:

```sql
select id, title, status from task where status = 'inprogress';
```

This would return:

```
| id | title                 | status     |
| -- | --------------------- | ---------- |
| 1  | Read the Next.js book | inprogress |
| 3  | Think of a funny joke | inprogress |
```

Here is how you can select all tasks that will take longer than 30 minutes:

```sql
select id, title, duration from task where duration > 30;
```

This would return:

```
| id | title                 | duration |
| -- | --------------------- | -------- |
| 1  | Read the Next.js book | 60       |
| 3  | Think of a funny joke | 120      |
```

You can use the `like` operator for more involved (string) comparisons.

When using the `like` operator, there are two characters of particular interest.
The `%` character matches a sequence of zero or more characters.
The `_` character matches a single character.

For example, you could match all tasks that contain the sequence "book" somewhere in the description like this:

```sql
select id, title, description from task where description like '%book%';
```

This would return:

```sql
| id | title                 | description                           |
| -- | --------------------- | ------------------------------------- |
| 1  | Read the Next.js book | Read and understand the Next.js book. |
```

You could match all tasks that have the sequence `'Write'`, followed by three characters, followed by `'task app'` like this:

```sql
select id, title, description from task where title like 'Write___task app';
```

This would return:

```sql
| id | title            | description                |
| -- | ---------------- | -------------------------- |
| 2  | Write a task app | Write an awesome task app. |
```

You can create a filter that checks if a value exists in a list by using the `in` operator:

```sql
select id, title from task where status in ('todo', 'inprogress');
```

This would return:

```
| id | title                 |
| -- | --------------------- |
| 1  | Read the Next.js book |
| 2  | Write a task app      |
| 3  | Think of a funny joke |
```

You can use the `and` and `or` keywords to combine conditions.
For example, you could select all tasks that are in progress _and_ will take longer than 90 minutes:

```sql
select id, title, status, duration
from task
where status = 'inprogress' and duration > 90;
```

This would return:

```
| id | title                 | status     | duration |
| -- | --------------------- | ---------- | -------- |
| 3  | Think of a funny joke | inprogress | 120      |
```

You could also select all tasks that are in progress _or_ will take longer than 90 minutes:

```sql
select id, title, status, duration
from task
where status = 'inprogress' or duration > 90;
```

This would return:

```
| id | title                 | status     | duration |
| -- | --------------------- | ---------- | -------- |
| 1  | Read the Next.js book | inprogress | 60       |
| 3  | Think of a funny joke | inprogress | 120      |
```

### Ordering and Limiting Results

You can order the results using the `order by` keyword.
To specify the ordering, you can use the `asc` (ascending) or `desc` (descending) keywords.

Here is how you could order the tasks by duration (ascending):

```sql
select id, title, duration from task order by duration asc;
```

This would return:

```
| id | title                 | duration |
| -- | --------------------- | -------- |
| 2  | Write a task app      | 10       |
| 1  | Read the Next.js book | 60       |
| 3  | Think of a funny joke | 120      |
```

Alternatively, you could order the tasks by duration (descending):

```sql
select id, title, duration from task order by duration desc;
```

This would return:

```
| id | title                 | duration |
| -- | --------------------- | -------- |
| 3  | Think of a funny joke | 120      |
| 1  | Read the Next.js book | 60       |
| 2  | Write a task app      | 10       |
```

You can limit results using the `limit` clause.
The `limit` clause allows you to limit the number of records to return.

For example, here is how you could get the two tasks with the highest duration:

```sql
select id, title, duration
from task
order by duration desc
limit 2;
```

This would return:

```
| id | title                 | duration |
| -- | --------------------- | -------- |
| 3  | Think of a funny joke | 120      |
| 1  | Read the Next.js book | 60       |
```

Of course, you can use the `order by` and `limit` clauses together with the `where` clause.

For example, here is how you could get the longest task that has the status `inprogress`:

```sql
select id, title, duration, status
from task
where status = 'inprogress'
order by duration desc
limit 1;
```

This would return:

```
| id | title                 | duration | status     |
| -- | --------------------- | -------- | ---------- |
| 3  | Think of a funny joke | 120      | inprogress |
```
