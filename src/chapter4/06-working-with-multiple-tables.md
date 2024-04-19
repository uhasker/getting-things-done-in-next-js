## Working with Multiple Tables

### Adding Projects

Let's add projects to our application.
Each project can contain multiple tasks and each task should belong to exactly one project.

Now it might tempting to simply add a project ID and name to each task row, however that would lead to a lot of redundant data.
This is bad primarily because it means that if we update tasks or project we might make a mistake somewhere resulting in malformed data.

For example, we might forget to change a project name in some row.
Suddenly we would have a project with one ID and two names.

Therefore it is good practice to split data into multiple tables to reduce redundancy and improve data integrity.
Each table should contain data about a specific entity (like "task" or "project").

The entities can then be linked together using **foreign keys**.

### Foreign Keys

Let's create a project table:

```sql
create table project (
    id serial primary key,
    name varchar(255) not null
);
```

Let's add a column to the task table that will store the project ID:

```sql
alter table task
add column project_id integer;
```

Finally, we will establish a foreign key relationship.
A foreign key is a column in one table that _links_ to the _primary key in another table_.

Here the `project_id` should reference the `id` column in the `project` table:

```sql
alter table task
add constraint fk_project
foreign key (project_id)
references project(ID);
```

Note that foreign keys are another type of constraint.
You can't insert a `task` into the task table if the `project_id` column doesn't reference some `task`.

For example:

```sql
insert into task (title, description, duration, status, project_id) values
('Read the Next.js book', 'Read and understand the Next.js book.', 60, 'inprogress', 1);
```

This will result in the following error:

```
ERROR: 23503: insert or update on table "task" violates foreign key constraint "fk_project"
DETAIL: Key (project_id)=(1) is not present in table "project".
```

In order to avoid this, we would need to add a new project first:

```sql
insert into project (name) values ('Learn web development');
```

Let's look at the newly added project:

```sql
select * from project;
```

This should result in something like:

```
| id | name                  |
| -- | --------------------- |
| 1  | Learn web development |
```

Now we could actually insert a task with a `project_id` of `1`:

```sql
insert into task (title, description, duration, status, project_id) values
('Read the Next.js book', 'Read and understand the Next.js book.', 60, 'inprogress', 1);
```

Note that adding a `foreign key` constraint does _not_ automatically add a `not null` constraint.
For example, you could still do this:

```sql
insert into task (title, description, duration, status, project_id) values
('Read the Next.js book', 'Read and understand the Next.js book.', 60, 'inprogress', null);
```

If you want every task to always have a `project_id` you would need to explicitly add a `not null` constraint to the `project_id` column.

### Inner Joins

If we want to select data from multiple tables, we can use **join operations**.
The most common and important join operation is the `inner join` which combines rows from tables based on a related column between them.

Consider the following data:

```sql
insert into project (name) values ('Learn web development'), ('Gain practical experience'), ('Have fun');
insert into task (title, description, duration, status, project_id) values
('Read the Next.js book', 'Read and understand the Next.js book.', 60, 'inprogress', 1),
('Read the Next.js docs', 'Read and understand the Next.js docs.', 120, 'inprogress', 1),
('Write a task app', 'Write an awesome task app.', 120, 'todo', 2),
('Think of a funny joke', 'Come up with a funny joke to lighten the mood.', 120, 'inprogress', null);
```

Now let's query some data across both tables.
For example, we might care about getting every task ID, title and status together with the project ID and name.

```sql
select task.id as task_id, task.title as task_title, task.status as task_status, project.id as project_id, project.name as project_name
from task
inner join project on task.project_id = project.id;
```

This would return:

```
| task_id | task_title            | task_status | project_id | project_name              |
| ------- | --------------------- | ----------- | ---------- | ------------------------- |
| 1       | Read the Next.js book | inprogress  | 1          | Learn web development     |
| 2       | Read the Next.js docs | inprogress  | 1          | Learn web development     |
| 3       | Write a task app      | todo        | 2          | Gain practical experience |
```

Note that the 'Have fun' project doesn't appear in the table since there are no corresponding tasks.
The same goes for the 'Think of a funny joke' task.

## Outer Joins

If we wanted tasks/project that don't have corresponding projects/tasks to appear as well, we would need to use an **outer join** - either a **left outer join** or a **right outer join**.

For example, if we wanted to get all tasks that don't have any associated project, we would need to use a left join:

```sql
select task.id as task_id, task.title as task_title, task.status as task_status, project.id as project_id, project.name as project_name
from task
left join project on task.project_id = project.id;
```

This would return:

```
| task_id | task_title            | task_status | project_id | project_name              |
| ------- | --------------------- | ----------- | ---------- | ------------------------- |
| 1       | Read the Next.js book | inprogress  | 1          | Learn web development     |
| 2       | Read the Next.js docs | inprogress  | 1          | Learn web development     |
| 3       | Write a task app      | todo        | 2          | Gain practical experience |
| 4       | Think of a funny joke | inprogress  |            |                           |
```

Similarly, if we wanted to return all projects that don't have any associated tasks, we would need to use a right join:

```sql
select task.id as task_id, task.title as task_title, task.status as task_status, project.id as project_id, project.name as project_name
from task
right join project on task.project_id = project.id;
```

This would return:

```
| task_id | task_title            | task_status | project_id | project_name              |
| ------- | --------------------- | ----------- | ---------- | ------------------------- |
| 1       | Read the Next.js book | inprogress  | 1          | Learn web development     |
| 2       | Read the Next.js docs | inprogress  | 1          | Learn web development     |
| 3       | Write a task app      | todo        | 2          | Gain practical experience |
|         |                       |             | 3          | Have fun                  |
```

### Association Tables

So far the relationships we worked with were **one-to-many relationships** (or many-to-one relationships depending on your point of view).
However, often we need to work with **many-to-many relationships** instead.

Let's say that one task could belong to multiple projects at the same time.
Since one project can have multiple tasks, we now have a many-to-many relationship.

The way to model this in SQL is by using a **junction table** (also called an associative table).
This table maps the two tables together.

Consider the following `task` table:

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

And consider the following `project` table:

```sql
create table project (
    id serial primary key,
    name text not null
);
```

The junction table would need to reference the `project` table on one side and the `task` table on the other side:

```sql
create table project_task (
    project_id integer,
    task_id integer,
    primary key (project_id, task_id),
    foreign key (project_id) references project(id),
    foreign key (task_id) references task(id)
);
```

Next we could insert some data:

```sql
insert into project (name) values ('Learn web development'), ('Gain practical experience'), ('Have fun');
insert into task (title, description, duration, status) values
('Read the Next.js book', 'Read and understand the Next.js book.', 60, 'inprogress'),
('Read the Next.js docs', 'Read and understand the Next.js docs.', 120, 'inprogress'),
('Write a task app', 'Write an awesome task app.', 120, 'todo'),
('Think of a funny joke', 'Come up with a funny joke to lighten the mood.', 120, 'inprogress');
```

Finally we need to link tasks to projects:

```sql
insert into project_task (project_id, task_id) values
(1, 1), (1, 2), (1, 3), (2, 3)
```

Note that the task `'Write a task app'` is now linked to both the `'Learn web development'` and the `'Gain practical experience'` project.

To query the data, we now need to perform a join over multiple tables:

```sql
select p.name as project_name, t.title as task_title, t.status as task_status
from project_task pt
join project p on pt.project_id = p.id
join task t on pt.task_id = t.id;
```

This would return:

```
| project_name              | task_title            | task_status |
| ------------------------- | --------------------- | ----------- |
| Learn web development     | Read the Next.js book | inprogress  |
| Learn web development     | Read the Next.js docs | inprogress  |
| Learn web development     | Write a task app      | todo        |
| Gain practical experience | Write a task app      | todo        |
```
