## Project Page

### Creating the Table

Let's add projects to our application.
The idea is simple - tasks belong to projects now and each project might contain multiple tasks.

First, we need to make a change to the schema:

```ts
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const projectTable = pgTable('project', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const taskTable = pgTable('task', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
  projectId: integer('projectId')
    .notNull()
    .references(() => projectTable.id),
});
```

Next, we need to create a migration:

```sh
pnpm db:generate
```

This will create a new migration in `db/migrations`.

If you would try to run the migrations right now, you would see the following error:

```
PostgresError: column "projectId" of relation "task" contains null values
```

This is because we already have tasks and the migration doesn't know what to do with them.
In the real world, we would need to manually change the migration (or make the `projectId` column nullable).
However, for now we will simply delete the tasks, because we have no real users yet anyway.

Now run the migrations:

```sh
pnpm db:migrate
```

### Updating the Tasks Page

Let's move the tasks page to `app/project/[id]/page.tsx`.
Also let's move the task form to `app/project/[id]/task-form.tsx`.

We will also retrieve the project ID and only show and add tasks for the current project:

```jsx
import { db } from '@/db';
import { taskTable } from '@/db/schema';
import { TaskForm } from './task-form';
import { eq } from 'drizzle-orm';

export default async function Project({ params: { id } }: { params: { id: number } }) {
  const tasks = await db.select().from(taskTable).where(eq(taskTable.projectId, id));

  return (
    <>
      <TaskForm projectId={id} />
      {tasks.map((task) => (
        <div className="border border-gray-400 w-96 mx-auto p-4">
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm">{task.status}</p>
        </div>
      ))}
    </>
  );
}
```

Update the `TaskForm`:

```ts
export function TaskForm({ projectId }: { projectId: number }) {
  // ...

  async function handleSubmit(event) {
    // ...
    await insertTask(title, description, projectId);
    // ...
  }

  // ...
}
```

Update the `insertTask` function:

```ts
export async function insertTask(title: string, description: string, projectId: number) {
  await db.insert(taskTable).values({ title, description, status: 'In progress', projectId });
}
```

### Creating the Project Page

Add an `insertProject` function to `db/actions.ts`:

```ts
export async function insertProject(name: string) {
  await db.insert(projectTable).values({ name });
}
```

Finally, let's create a `ProjectForm` in `app/project-form.tsx`:

```jsx
'use client';

import { insertProject } from '@/db/actions';
import { useRouter } from 'next/navigation';

export function ProjectForm() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const name = event.currentTarget.name.value.trim();
    await insertProject(name);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-64 space-y-4 mx-auto my-4">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" className="border border-gray-400" />
      <button
        type="submit"
        className="text-center bg-blue-500 w-24 text-white p-2 font-bold rounded-md"
      >
        Add Project
      </button>
    </form>
  );
}
```

This duplicates the `TaskForm` a bit - a good exercise would be to try and use a single component for the project and for the task form.

Then we will create a new `app/page.tsx` which will contain the projects:

```ts
import { db } from '@/db';
import { projectTable } from '@/db/schema';
import { ProjectForm } from './project-form';

export default async function Home() {
  const projects = await db.select().from(projectTable);

  return (
    <>
      <ProjectForm />
      {projects.map((project) => (
        <h3 className="border border-gray-400 w-96 mx-auto p-4 text-lg font-bold">
          {project.name}
        </h3>
      ))}
    </>
  );
}
```

Now we can add projects.

### Adding Navigation

Let's make all projects into links, so that we can navigate to the individual project pages:

```jsx
<div className="flex flex-col">
  {projects.map((project) => (
    <Link
      href={`project/${project.id}`}
      className="border border-gray-400 w-96 mx-auto p-4 text-lg font-bold"
    >
      {project.name}
    </Link>
  ))}
</div>
```
