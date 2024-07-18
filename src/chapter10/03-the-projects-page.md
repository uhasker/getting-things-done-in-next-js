## The Projects Page

### Project List

Let's create a component `ProjectList` in `app/project-list.tsx` that will show a nicely styled list of projects:

```jsx
export function ProjectList({ projects }: { projects: { id: number, name: string }[] }) {
  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      {projects.map((project) => (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 ease-in-out">
          <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-150 ease-in-out">
            {project.name}
          </span>
        </div>
      ))}
    </div>
  );
}
```

Update the `app/page.tsx` file to retrieve the projects show the project list:

```jsx
import { db } from '@/db';
import { projectTable } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { SignIn } from '@clerk/nextjs';
import { ProjectList } from './project-list';
import { eq } from 'drizzle-orm';

export default async function Home() {
  const { userId } = auth();

  if (userId === null) {
    // ...
  }

  const projects = await db.select().from(projectTable).where(eq(projectTable.userId, userId));

  return <ProjectList projects={projects} />;
}
```

Add a few projects with the correct user ID to the database and go to `localhost:3000`.
You should see a project list containing the added projects.

### Fixing a Lint

While has no syntax errors, no type errors and generally works correctly, there is one issue.

If you read this book carefully so far, you should theoretically be able to figure it out, but it might take a while.
Let's use our awesome ESLint tool instead:

```sh
pnpm lint
```

You should see:

```
./src/app/project-list.tsx
9:9  Error: Missing "key" prop for element in iterator  react/jsx-key
```

Remember that if you want to render a list in React, you should give the individual elements a `key` prop.
In this case, a good key prop would be the primary key from the database, so let's use that.

Add the `key` property to the project `div` in `app/project-list.tsx` like this:

```jsx
// ...
<div
  key={project.id}
  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 ease-in-out"
>
  <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-150 ease-in-out">
    {project.name}
  </span>
</div>
// ...
```

If you rerun `pnpm lint`, you should see no more errors.

### New Project Modal

Let's create a modal that will allow us to add new projects at `app/new-project-modal.tsx`:

```jsx
"use client";

import * as React from "react";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface ProjectFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function NewProjectModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
}) {
  async function handleSubmit(event: React.FormEvent<ProjectFormElement>) {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value.trim();
    await onSubmit(name);
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
          <h2 className="text-xl font-semibold text-gray-800">Add Project</h2>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-md border-transparent focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}
```

Let's create a file `db/actions.ts` containing the `insertProject` function:

```ts
'use server';

import { db } from '.';
import { projectTable } from './schema';

export async function insertProject(userId: string, name: string) {
  await db.insert(projectTable).values({ userId, name });
}
```

We need to show the modal in the project list by modifying the `app/project-list.tsx` file:

```jsx
'use client';

import { insertProject } from '@/db/actions';
import { NewProjectModal } from './new-project-modal';

import * as React from 'react';
import { useRouter } from 'next/navigation';

export function ProjectList({
  userId,
  projects,
}: {
  userId: string,
  projects: { id: number, name: string }[],
}) {
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);

  async function handleNewProject(name: string) {
    await insertProject(userId, name);
    setShowModal(false);
    router.refresh();
  }

  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow hover:shadow-md transition duration-200 ease-in-out"
      >
        Add New Project
      </button>

      {/* Project list here */}

      {showModal && (
        <NewProjectModal onSubmit={handleNewProject} onClose={() => setShowModal(true)} />
      )}
    </div>
  );
}
```

Finally, we need to update the `app/page.tsx` file since the `ProjectList` component now takes a user ID:

```jsx
export default async function Home() {
  // ...

  return <ProjectList userId={userId} projects={projects} />;
}
```

Go to `localhost:3000` and try adding a few projects using the "Add new project" button and the project modal.
