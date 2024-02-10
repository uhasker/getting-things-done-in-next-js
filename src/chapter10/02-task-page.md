## Task Page

### Showing the Tasks

Change the `page.tsx` file:

```tsx
import { db } from '@/db';
import { db } from '@/db';
import { taskTable } from '@/db/schema';

export default async function Home() {
  const tasks = await db.select().from(taskTable);
  return (
    <>
      {tasks.map((task) => (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.status}</p>
        </div>
      ))}
    </>
  );
}
```

Insert a few tasks into the table:

```sql
insert into task (title, description, status) VALUES
('Read the Next.js book', 'Read and understand the Next.js book.', 'In progress'),
('Write a task app', 'Write an awesome task app.', 'Todo'),
('Think of a funny joke', 'Come up with a funny joke to lighten the mood.', 'In progress');
```

Refresh the page and you should see the tasks.

### Adding the Form

Add the form and the `onSubmit` function:

```tsx
import { db } from '@/db';
import { taskTable } from '@/db/schema';

export default async function Home() {
  const tasks = await db.select().from(taskTable);

  async function handleSubmit(event) {
    event.preventDefault();
    const title = event.currentTarget.title.value.trim();
    const description = event.currentTarget.description.value.trim();

    await db.insert(taskTable).values({ title, description, status: 'In progress' });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" />
        <button type="submit">Send</button>
      </form>
      {tasks.map((task) => (
        <p>{`${task.title} (${task.description}) ${task.status}`}</p>
      ))}
    </>
  );
}
```

You will get an error:

```
Error: Event handlers cannot be passed to Client Component props.
  <form onSubmit={function} children=...>
                 ^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
```

If you try to slap a "use client" on top of the component, you will get a different error:

```
./node_modules/.pnpm/postgres@3.4.3/node_modules/postgres/src/connection.js:1:0
Module not found: Can't resolve 'net'

https://nextjs.org/docs/messages/module-not-found

Import trace for requested module:
./node_modules/.pnpm/postgres@3.4.3/node_modules/postgres/src/index.js
./src/db/index.ts
./src/app/page.tsx
```

### Fixing the Component

Create the file `db/actions.ts`:

```ts
'use server';

import { db } from '.';
import { taskTable } from './schema';

export async function insertTask(title: string, description: string) {
  await db.insert(taskTable).values({ title, description, status: 'In progress' });
}
```

Move the task form to a client component:

```tsx
'use client';

import { insertTask } from '@/db/actions';

export function TaskForm() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const title = event.currentTarget.title.value.trim();
    const description = event.currentTarget.description.value.trim();
    await insertTask(title, description);

    // Need to refresh
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" />
      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" />
      <button type="submit">Send</button>
    </form>
  );
}
```

The `page.tsx` should look like this:

```jsx
import { db } from '@/db';
import { taskTable } from '@/db/schema';
import { TaskForm } from './task-form';

export default async function Home() {
  const tasks = await db.select().from(taskTable);

  return (
    <>
      <TaskForm />
      {tasks.map((task) => (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.status}</p>
        </div>
      ))}
    </>
  );
}
```
