## Task Page

### Showing the Tasks

Let's show all the tasks on the homepage by changing `app/page.tsx`:

```jsx
import { db } from '@/db';
import { taskTable } from '@/db/schema';

export default async function Home() {
  // Get all the tasks from the task table
  const tasks = await db.select().from(taskTable);

  // Render the tasks
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

Note that this is a server component, which is why we can directly call a database function in our component.

Let's insert a few tasks into the table:

```sql
insert into task (title, description, status) VALUES
('Read the Next.js book', 'Read and understand the Next.js book.', 'In progress'),
('Write a task app', 'Write an awesome task app.', 'Todo'),
('Think of a funny joke', 'Come up with a funny joke to lighten the mood.', 'In progress');
```

Refresh the page and you should see the tasks.

> That was really simple, wasn't it?
> This is the big advantage of rendering components on the server.
> If we would render everything on the client, we would need to create an endpoint, call the endpoint on the client etc.

### Adding the Form

Next, we need to add the form for creating a new task.
The form should have an input field for the title and the description of the task.
We will automatically set the status of the task to "In progress" and the task ID will be automatically set by the database.

Let's add the form and write the function that we will pass to `onSubmit`:

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

Go to the page now and you will get an error:

```
Error: Event handlers cannot be passed to Client Component props.
  <form onSubmit={function} children=...>
                 ^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
```

This is why it's so important to actually understand what server and client components do.
If you don't know these concepts, you would have a very hard time resolving this error.

For example, maybe you would try to slap a "use client" on top of the component.
Only to get a different error:

```
./node_modules/.pnpm/postgres@3.4.3/node_modules/postgres/src/connection.js:1:0
Module not found: Can't resolve 'net'

https://nextjs.org/docs/messages/module-not-found

Import trace for requested module:
./node_modules/.pnpm/postgres@3.4.3/node_modules/postgres/src/index.js
./src/db/index.ts
./src/app/page.tsx
```

This one is even worse.
Why can't `net` be resolved?
What even is `net`?

That won't do.
We need to use our _knowledge_ to fix the problem.

### Fixing the Component

Of course, if you _understand_ the difference between client and server components, the problem is really obvious.
Our form should clearly be a client component since it contains a form submission handler.
However we also need to call the database which should happen on the server.

Therefore we need to extract the form as a client component.
Then we need to extract the task insertion into a server action and call it from the client component.

Let's first extract the form.
Create a new file `app/task-form.tsx`:

```tsx
'use client';

import { insertTask } from '@/db/actions';

export function TaskForm() {
  async function handleSubmit(event) {
    event.preventDefault();
    const title = event.currentTarget.title.value.trim();
    const description = event.currentTarget.description.value.trim();
    await insertTask(title, description);
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

Now create a file `db/actions.ts` and write the implementation for `insertTask`.
Don't forget the `'use server'` directive and the top of the file:

```ts
'use server';

import { db } from '.';
import { taskTable } from './schema';

export async function insertTask(title: string, description: string) {
  await db.insert(taskTable).values({ title, description, status: 'In progress' });
}
```

Now change the `app/page.tsx` file to use the `TaskForm` client component:

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

Voila!
The error no longer appears.

The only problem that is left is that you currently need to manually refresh the page after the task is submitted.
Let's use the Next.js router the refresh the page upon task submission:

```tsx
// ...
import { useRouter } from 'next/navigation';

export function TaskForm() {
  const router = useRouter();

  async function handleSubmit(event) {
    // ...
    router.refresh();
  }

  // ...
}
```
