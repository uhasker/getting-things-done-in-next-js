## Multiple Tables

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
add COLUMN project_id integer;
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

### Inner Joins

If we want to select data from multiple tables, we can use **join operations**.
The most common and important join operation is the `inner join` which combines rows from tables based on a related column between them:

```sql
select task.id as task_id, task.title, task.status, project.name as project_name
from task
inner join project on task.project_id = project.id;
```
