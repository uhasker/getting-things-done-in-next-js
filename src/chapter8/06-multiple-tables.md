## Multiple Tables

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

Finally, we will establish a foreign key relationship:

```sql
alter table task
add constraint fk_project
foreign key (project_id)
references project(ID);
```

### Inner Joins

We can use inner joins to combine data from multiple columns:

```sql
select task.id as task_id, task.title, task.status, project.name as project_name
from task
inner join project on task.project_id = project.id;
```
