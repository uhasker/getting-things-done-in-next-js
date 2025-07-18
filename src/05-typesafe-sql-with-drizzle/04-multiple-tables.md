## Multiple Tables

<div style="text-align: right"> <i> Y'all should just copy everything Eloquent has <br> — From Drizzles' official marketing page </i> </div>

### Adding Projects

Let's again add projects to our application.
Remember, that each project can contain multiple tasks and each task should belong to exactly one project.

Here is how we could accomplish this in SQL:

```sql
create table project (
    id serial primary key,
    name varchar(255) not null
);

alter table task
add column project_id integer;

alter table task
add constraint fk_project
foreign key (project_id)
references project(id);
```

Let's also add new tasks and projects to the `task` and `project` tables respectively:

```sql
insert into project (name) values ('Learn web development'), ('Gain practical experience'), ('Have fun');
insert into task (title, description, duration, status, project_id) values
('Read the Next.js book', 'Read and understand the Next.js book.', 60, 'inprogress', 1),
('Read the Next.js docs', 'Read and understand the Next.js docs.', 120, 'inprogress', 1),
('Write a task app', 'Write an awesome task app.', 120, 'todo', 2),
('Think of a funny joke', 'Come up with a funny joke to lighten the mood.', 120, 'inprogress', null);
```

### Foreign Keys

Let's recreate the project and task table from the SQL chapter in Drizzle:

```ts
const statusEnum = pgEnum('status', ['todo', 'inprogress', 'done']);

const projectTable = pgTable('project', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

const taskTable = pgTable(
  'task',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    status: statusEnum().notNull(),
    duration: integer('duration'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    projectId: integer('project_id').references(() => projectTable.id),
  },
  (table) => [
    {
      durationCheckConstraint: check('duration_check', sql`${table.duration} > 0`),
    },
  ],
);
```

### Inner Join

In the SQL chapter, we've already explained that to select data from multiple tables, we can use join operations.

In Drizzle, the `innerJoin` function can be used to perform an inner join:

```ts
await db.select().from(projectTable).innerJoin(taskTable, eq(projectTable.id, taskTable.projectId));
```

This would return:

```json
[
  {
    "project": { "id": 1, "name": "Learn web development" },
    "task": {
      "id": 1,
      "title": "Read the Next.js book",
      "description": "Read and understand the Next.js book.",
      "status": "inprogress",
      "duration": 60,
      "createdAt": "2024-12-15T19:31:15.196Z",
      "projectId": 1
    }
  },
  {
    "project": { "id": 1, "name": "Learn web development" },
    "task": {
      "id": 2,
      "title": "Read the Next.js docs",
      "description": "Read and understand the Next.js docs.",
      "status": "inprogress",
      "duration": 120,
      "createdAt": "2024-12-15T19:31:15.196Z",
      "projectId": 1
    }
  },
  {
    "project": { "id": 2, "name": "Gain practical experience" },
    "task": {
      "id": 3,
      "title": "Write a task app",
      "description": "Write an awesome task app.",
      "status": "todo",
      "duration": 120,
      "createdAt": "2024-12-15T19:31:15.196Z",
      "projectId": 2
    }
  }
]
```

Note that the result is a list of objects, where each object in turn contains multiple objects representing the rows from the different tables.

For example, here is you could access the task and the project of the first record in the join result:

```ts
const tasksAndProjects = await db
  .select()
  .from(projectTable)
  .innerJoin(taskTable, eq(projectTable.id, taskTable.projectId));
const firstTask = tasksAndProjects[0].task;
const firstProject = tasksAndProjects[0].project;
console.log({ firstTask, firstProject });
```

This would output:

```json
{
  "firstTask": {
    "id": 1,
    "title": "Read the Next.js book",
    "description": "Read and understand the Next.js book.",
    "status": "inprogress",
    "duration": 60,
    "createdAt": "2024-12-15T19:31:15.196Z",
    "projectId": 1
  },
  "firstProject": { "id": 1, "name": "Learn web development" }
}
```

You can perform a left join and a right join in a similar manner:

```ts
await db.select().from(projectTable).leftJoin(taskTable, eq(projectTable.id, taskTable.projectId));
await db.select().from(projectTable).rightJoin(taskTable, eq(projectTable.id, taskTable.projectId));
```
