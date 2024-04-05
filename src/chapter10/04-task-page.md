# Task Page

## Schema Update

Create a new task table in `db/schema.ts`:

```ts
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

Generate and execute the migration.

## Task Page

Create the task page at `project/[id]/page.tsx`:

```jsx
import { db } from '@/db';
import { projectTable, taskTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs';

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
        <p>{task.name}</p>
      ))}
    </div>
  );
}
```

## Task List

Create the task list at `project/[id]/task-list.tsx`:

```jsx
export function TaskList({
  projectId,
  tasks,
}: {
  projectId: number,
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

Use the `TaskList` in `project/[id]/task-list.tsx`:

```jsx
import { db } from '@/db';
import { projectTable, taskTable } from '@/db/schema';
import { NewTaskModal } from './new-task-modal';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs';
import { TaskList } from './task-list';

export default async function Project({ params: { id } }: { params: { id: number } }) {
  // ...

  return <TaskList projectId={project.id} tasks={tasks} />;
}
```

## New Task Modal

Create a file `project/[id]/new-task-modal.tsx`:

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

Use the new task modal in the `project/[id]/task-list.tsx` file:

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
