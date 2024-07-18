## Task Page

### Schema Update

We now have a page where we can show the created projects.
However, this is not terribly useful as long as we can't add tasks to the projects.

First, we need a place to store the tasks in our database.
Create a new task table in `db/schema.ts`:

```ts
import { integer /*...*/ } from 'drizzle-orm/pg-core';

// ...

export const taskTable = pgTable('task', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  projectId: integer('project_id')
    .notNull()
    .references(() => projectTable.id),
});
```

Generate the migration:

```sh
pnpm db:generate
```

Review the migration (which might be something like `db/migrations/0001_loose_wonder_man.sql`):

```sql
CREATE TABLE IF NOT EXISTS "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
```

Execute the migration:

```sh
pnpm db:migrate
```

Check that the `task` table is present in the database together with the right columns.

### Task Page

Now let's create a page containing the tasks of a given project at `app/project/[id]/page.tsx`:

```jsx
import { db } from '@/db';
import { projectTable, taskTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export default async function Project({ params: { id } }: { params: { id: number } }) {
  const { userId } = auth();

  const projects = await db.select().from(projectTable).where(eq(projectTable.id, id));
  const project = projects[0];

  if (project.userId !== userId) {
    return <h1>Not allowed to access project</h1>;
  }

  const tasks = await db.select().from(taskTable).where(eq(taskTable.projectId, id));

  return (
    <div>
      {tasks.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}
    </div>
  );
}
```

Add a few tasks to the project with the ID `1` and go to `localhost:3000/project/1` - you should see these tasks.
However, the UX is currently quite ugly, so let's improve it.

### Task List

Create the a `TaskList` component at `app/project/[id]/task-list.tsx`:

```jsx
export function TaskList({
  tasks,
}: {
  tasks: { id: number, title: string, description: string, status: string }[],
}) {
  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-col bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 ease-in-out"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-4">{task.description}</p>
          <p className="text-sm text-blue-500">{task.status}</p>
        </div>
      ))}
    </div>
  );
}
```

Use the `TaskList` in `app/project/[id]/task-list.tsx`:

```jsx
// ...
import { TaskList } from './task-list';

export default async function Project({ params: { id } }: { params: { id: number } }) {
  // ...

  return <TaskList tasks={tasks} />;
}
```

### New Task Modal

Finally, let's create a modal that will allow us to add new tasks.
Create a file `app/project/[id]/new-task-modal.tsx`:

```jsx
"use client";

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
}

interface TaskFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function NewTaskModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (title: string, description: string) => Promise<void>;
}) {
  async function handleSubmit(event: React.FormEvent<TaskFormElement>) {
    event.preventDefault();
    const title = event.currentTarget.elements.title.value.trim();
    const description = event.currentTarget.elements.description.value.trim();
    await onSubmit(title, description);
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center px-4">
      <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Add Task</h2>
          <div>
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-md border-transparent focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-md border-transparent focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
```

Let's add a new database function `insertTask` in `db/actions.ts`:

```ts
// ...
import { taskTable /*...*/ } from './schema';

// ...

export async function insertTask(title: string, description: string, projectId: number) {
  await db.insert(taskTable).values({ title, description, status: 'inprogress', projectId });
}
```

Use the new task modal in the `app/project/[id]/task-list.tsx` file:

```jsx
'use client';

import { insertTask } from '@/db/actions';
import { NewTaskModal } from './new-task-modal';
import * as React from 'react';
import { useRouter } from 'next/navigation';

export function TaskList({
  projectId,
  tasks,
}: {
  projectId: number,
  tasks: { id: number, title: string, description: string, status: string }[],
}) {
  const [showNewTaskModal, setShowNewTaskModal] = React.useState(false);

  const router = useRouter();

  async function handleNewTask(title: string, description: string) {
    await insertTask(title, description, projectId);
    setShowNewTaskModal(false);
    router.refresh();
  }

  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      <button
        onClick={() => setShowNewTaskModal(true)}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow hover:shadow-md transition duration-200 ease-in-out"
      >
        Add New Task
      </button>
      {/* Task list */}
      {showNewTaskModal && (
        <NewTaskModal onSubmit={handleNewTask} onClose={() => setShowNewTaskModal(false)} />
      )}
    </div>
  );
}
```

Since the `TaskList` component takes a `projectId` prop, we need to update `app/project/[id]/page.tsx`:

```js
export default async function Project(/* ...*/) {
  // ...
  return <TaskList projectId={id} tasks={tasks} />;
}
```

You should now be able to use the "Add new task" button and the modal to add new tasks to the project.
