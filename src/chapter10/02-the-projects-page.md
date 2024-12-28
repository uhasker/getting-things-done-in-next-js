## The Projects Page

### Project List

Let's create a component `ProjectList` in `project-list.tsx` that will show a nicely styled list of projects:

```jsx
export function ProjectList({ projects }: { projects: { id: number, name: string }[] }) {
  return (
    <div className="my-8 mx-auto max-w-2xl">
      {projects.map((project) => (
        <div className="flex items-center justify-between bg-white p-4 rounded shadow mb-4 hover:shadow transition">
          <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
            {project.name}
          </span>
        </div>
      ))}
    </div>
  );
}
```

Next, we will update the `page.tsx` file to show the project list.

```jsx
import { db } from './db';
import { projectTable } from './db/schema';
import { ProjectList } from './project-list';

export default async function Home() {
  const projects = await db.select().from(projectTable);

  return <ProjectList projects={projects} />;
}
```

Add a few projects to the database and go to `http://localhost:3000`.
You should see a project list containing the added projects.

### Fixing a Lint

While our project has no syntax errors, no type errors and generally works correctly, there is one issue.

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

Add the `key` property to the project `div` in `project-list.tsx` like this:

```jsx
<div
  key={project.id}
  className="flex items-center justify-between bg-white p-4 rounded shadow mb-4 hover:shadow transition"
>
  <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
    {project.name}
  </span>
</div>
```

If you rerun `pnpm lint`, you should see no more errors.

### New Project Modal

Let's create a modal that will allow us to add new projects at `project-modal.tsx`:

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="relative w-full max-w-md bg-white p-6 rounded shadow">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Add Project</h2>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 border rounded focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}
```

Let's create a file `api/project/route.ts` with a `POST` endpoint that allows us to add a new project:

```ts
import { db } from '@/app/db';
import { projectTable } from '@/app/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
  }

  await db.insert(projectTable).values({ name });

  return NextResponse.json({ message: 'Project inserted successfully' }, { status: 200 });
}
```

We need to show the modal in the project list by modifying the `project-list.tsx` file:

```jsx
'use client';

import { NewProjectModal } from './project-modal';

import * as React from 'react';
import { useRouter } from 'next/navigation';

export function ProjectList({ projects }: { projects: { id: number, name: string }[] }) {
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);

  async function handleNewProject(name: string) {
    const response = await fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    setShowModal(false);
    router.refresh();
  }

  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 shadow transition"
      >
        Add New Project
      </button>

      {/* Project list here */}

      {showModal && (
        <NewProjectModal onSubmit={handleNewProject} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
```

Go to `http://localhost:3000` and try adding a few projects.
