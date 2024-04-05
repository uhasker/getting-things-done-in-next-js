# Project Page

## Project List

Let's create a file `project-list.tsx`:

```jsx
export function ProjectList({
  userId,
  projects,
}: {
  userId: string,
  projects: { id: number, name: string }[],
}) {
  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      {projects.map((project) => (
        <a href={`/project/${project.id}`}>
          <div
            key={project.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 ease-in-out"
          >
            <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-150 ease-in-out">
              {project.name}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
```

Update the `page.tsx` file to show the project list:

```jsx
export default async function Home() {
  // ...

  return <ProjectList userId={userId} projects={projects} />;
}
```

Add a few projects to the database and play around with them.

## New Project Modal

Let's create a modal that will allow us to add new projects at `new-project-modal.tsx`:

```jsx
"use client";

import { useRouter } from "next/navigation";
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

We need to show the modal in the project list by modifying the `project-list.tsx` file:

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
