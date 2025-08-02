## Task Page

### Schema Update

We now have a page where we can show the created projects.
However, this is not terribly useful as long as we can't add tasks to the projects.

First, we need a place to store the tasks in our database.
Create a new `task` table in `db/schema.ts`:

```ts
import { sql } from 'drizzle-orm';
import { check, integer, pgEnum /*...*/ } from 'drizzle-orm/pg-core';

// ...

export const statusEnum = pgEnum('status', ['todo', 'inprogress', 'done']);

// Declare the task table
export const taskTable = pgTable(
  'task',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    status: statusEnum().notNull(),
    duration: integer('duration'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    projectId: integer('project_id')
      .notNull()
      .references(() => projectTable.id),
  },
  (table) => [
    {
      durationCheckConstraint: check('duration_check', sql`${table.duration} > 0`),
    },
  ],
);
```

Generate the migration:

```sh
pnpm db:generate
```

Review the migration (which might be something like `db/migrations/0001_loose_wonder_man.sql`):

```sql
CREATE TYPE "public"."status" AS ENUM('todo', 'inprogress', 'done');
CREATE TABLE "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "status" NOT NULL,
	"duration" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"project_id" integer NOT NULL
);
ALTER TABLE "task" ADD CONSTRAINT "task_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;
```

Execute the migration:

```sh
pnpm db:migrate
```

Check that the `task` table is present in the database together with the right columns.

### Task Page

Now let's create a page containing the tasks of a given project at `app/project/[id]/page.tsx`:

```jsx
import { db } from '@/app/db';
import { projectTable, taskTable } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

export default async function Project({ params: { id } }: { params: { id: number } }) {
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

Add a few tasks to the project with the ID `1` and go to `http://localhost:3000/project/1` - you should see these tasks.
Next, we need to give the user a way to add tasks by themselves.

### Task List

Create a `TaskList` component at `app/project/[id]/task-list.tsx`:

```jsx
export function TaskList({
  tasks,
}: {
  tasks: { id: number, title: string, description: string, status: string }[],
}) {
  return (
    <div className="my-8 mx-auto max-w-2xl">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded shadow mb-4 hover:shadow transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <p className="text-sm text-blue-500">{task.status}</p>
        </div>
      ))}
    </div>
  );
}
```

Use the `TaskList` in `app/project/[id]/page.tsx`:

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
Create a file `app/project/[id]/task-modal.tsx`:

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="relative w-full max-w-md bg-white p-6 rounded shadow">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Add Task</h2>
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
              className="mt-1 block w-full px-3 py-2 bg-gray-50 rounded border focus:border-blue-500 focus:ring-blue-200"
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
              className="mt-1 block w-full px-3 py-2 bg-gray-50 rounded border focus:border-blue-500 focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
```

Let's add a new route in `task/route.ts`:

```ts
import { db } from '@/app/db';
import { taskTable } from '@/app/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { title, description, status, projectId } = await request.json();

  if (!title || !description || !projectId) {
    return NextResponse.json(
      { error: 'Task title, description and project ID are required' },
      { status: 400 },
    );
  }

  await db.insert(taskTable).values({ title, description, status: 'inprogress', projectId });

  return NextResponse.json({ message: 'Task inserted successfully' }, { status: 200 });
}
```

Use the new task modal in the `app/project/[id]/task-list.tsx` file:

```jsx
'use client';

import { NewTaskModal } from './task-modal';
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
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, projectId }),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    setShowNewTaskModal(false);
    router.refresh();
  }

  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      <button
        onClick={() => setShowNewTaskModal(true)}
        className="mb-6 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 shadow"
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

Finally, let's make all the projects on the homepage into links that take you to the respective project pages:

```jsx
<Link href={`/project/${project.id}`}>
  <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
    {project.name}
  </span>
</Link>
```

> Don't forget to import the `<Link>` component here.
