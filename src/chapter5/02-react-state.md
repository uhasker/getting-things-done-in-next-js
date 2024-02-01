## React State

<div style="text-align: right"> <i> Why was the useState hook feeling nostalgic? <br>
Because every time it was called, it brought back memories! <br> - From "1000 programming dad-jokes" </i> </div>

### Why State?

In the previous section we learned how to render components.
However, these components are completely "static" right now.
But in reality, you often need to have "dynamic" components that change based on some action.

For example, clicking a button might update a counter and typing into a form might update the input field.
This means that components need to be able to "remember" things (like the current counter or the current input field value).

To "remember" something, you can use state, which serves as a sort of memory for your component.

### A Simple Example

Let's create a simple counter component.
This component will have a button that increments a value:

```jsx
import * as React from 'react';

export default function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </>
  );
}
```

Try clicking the "Increment" button - it will increment the count by 1 each time you click it.

This example is simple, but it still shows exactly how to use state in React.

State is provided by the `useState` hook (a hook is basically just a special function).

This hook returns an array with two elements - a **state variable** and a **state setter function**.
The state variable (`count` in this case) will be the value that you want to remember.
The state setter function (`setCount` in this case) can be used to update the state variable.
The `useState` hook takes a single argument - the initial value of the state variable (which is `0` in this case).

Note that we make use of array destructuring here (which you should remember from chapter 1):

```ts
const [count, setCount] = React.useState(0);
```

Alternatively we could have written:

```ts
const countState = React.useState(0);
const count = countState[0];
const setCount = countState[1];
```

Please don't do that though - it will result in confusion since it's very unconventional to manually destructure the value returned from a hook.

### State vs Regular Variables

You should have a big question in the back of your head right now.
_Why do we need to go through all this pain?_
_Why not just use a regular variable?_

After all, this is how we always remembered values before.
We simply assigned them to variables.

Let's have a look at why this doesn't work with React:

```jsx
export default function Counter() {
  let count = 0;

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          count += 1;
        }}
      >
        Increment
      </button>
    </>
  );
}
```

Try clicking the button know - nothing will happen.
But why?

The problem lies in the fact that, while we do update the local variable, React doesn't actually rerender the component to show the change.
You can verify this by adding a few `console.logs`:

```jsx
export default function Counter() {
  let count = 0;

  console.log('Rendered counter component');

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          count += 1;
          console.log(`New value of count is ${count}`);
        }}
      >
        Increment
      </button>
    </>
  );
}
```

If you open the component and click the button a few times, you will see the following logs:

```
Rendered counter component
New value of count is 1
New value of count is 2
New value of count is 3
```

So the local variable is indeed updated - but this doesn't rerender the component.
We begin to see the purpose of the `useState` hook - to define a state whose _updates will trigger a rerender_.

This explanation should have immediately raised another question.
What happens if we skip the state setter function and just set the state variable directly?

```jsx
export default function Counter() {
  let [count, setCount] = React.useState(0);

  console.log('Rendered counter component');

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          count += 1;
          console.log(`New value of count is ${count}`);
        }}
      >
        Increment
      </button>
    </>
  );
}
```

If you click the button a few times, you will see the exact same behaviour as with the previous example:

```
Rendered counter component
New value of count is 1
New value of count is 2
New value of count is 3
```

Therefore if you need to update the UI of your component, you can't use local variables and you can't update the state variables directly.
You need to use the state setter function to not only update the state variable, but also to rerender the component.

Let's verify that using the state setter function does what we expect:

```jsx
export default function Counter() {
  let [count, setCount] = React.useState(0);

  console.log(`Rendered counter component with count=${count}`);

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
          console.log(`New value of count is ${count}`);
        }}
      >
        Increment
      </button>
    </>
  );
}
```

We will now see that the component rerenders if we click the "Increment" button:

```
Rendered counter component with count=0
New value of count is 0
Rendered counter component with count=1
```

Note that the value of `count` only changes on the _next render_.
Here is what happens:

The component renders for the first time.
Because the initial value of `count` is set to `0`, it will render with `count` being equal to `0`.

You click the button and `setCount` is called with `count + 1` (which will be `0 + 1`, i.e. `1`).
React rerenders the component while remembering that the new `count` should be `1`.

The component renders for the second time.
Because React remembered that `count` was set to `1`, the component will render with `count` set to `1`.

### Using State with a Form

Let us return to our task management application and add the form for creating a new task.
Enter the `task-list.tsx` file and import React at the top:

```js
import * as React from 'react';
```

Next we add the form containing inputs for the ID and the title, as well as an "Add task" button below the task list:

```jsx
export function TaskList({ tasks }: TaskListProps) {
  return (
    <>
      <ul>
        {tasks.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <form>
        <label htmlFor="taskId">Task ID:</label>
        <input type="text" id="taskId" />
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" />
        <br />
        <button type="submit">Add task</button>
      </form>
    </>
  );
}
```

Now we need to create a `handleSubmit` function, which will just log something to the console for now.
Remember from chapter 4 that we need to call the `preventDefault` function to prevent the default behaviour of a form submission (which includes a page refresh):

```js
function handleSubmit(event) {
  event.preventDefault();
  const taskId = event.currentTarget.taskId.value.trim();
  const title = event.currentTarget.title.value.trim();
  console.log(`Submitted ${taskId}, ${title}`);
}
```

Next we need to make sure that the `handleSubmit` function is called when the button is clicked.
To accomplish that, we set the `onSubmit` property of the form to the `handleSubmit` function:

```jsx
<form onSubmit={handleSubmit}>{/*Additional JSX here*/}</form>
```

If you click the button, you should now see the title logged to the console.

Again we use the `useState` hook:

```js
const [tasks, setTasks] = React.useState<Task[]>([]);
```

We now want to add the task to the end when the form is submitted:

```js
function handleSubmit(event) {
  event.preventDefault();
  const taskId = event.currentTarget.taskId.value.trim();
  const title = event.currentTarget.title.value.trim();
  setTasks([
    ...previousTasks,
    {
      id: taskId,
      title,
    },
  ]);
}
```

This is how the full code looks like:

```jsx
import * as React from "react";

type Task = {
  id: string;
  title: string;
};

export default function TaskList() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  function handleSubmit(event) {
    event.preventDefault();
    const taskId = event.currentTarget.taskId.value.trim();
    const title = event.currentTarget.title.value.trim();
    setTasks([
      ...tasks,
      {
        id: taskId,
        title,
      },
    ]);
  }

  return (
    <>
      <ul>
        {tasks.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskId">Task ID:</label>
        <input type="text" id="taskId" />
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" />
        <br />
        <button type="submit">Add task</button>
      </form>
    </>
  );
}

```

Try clicking the button - a new task should appear.

### When to use State

There is a common theme regarding state in React - a lot of beginners _heavily overuse_ it.
This is usually because they misunderstand the purpose of state and what it actually does.

Before we give specific examples of when to use and when not to use state, we want to reiterate two things we already discussed:

First, state should only be used if your component needs to remember something.

Second, state updates are expensive, because a state update will rerender your component.

The corollary to these two things is that **you should only use state when you absolutely need it**, i.e. **you should keep state to a minimum**.

First, you should never ever store static data in state.
For example, this is completely unnecessary:

```jsx
export default function BadTaskList() {
  const tasks = React.useState([
    {
      id: 'TSK-1',
      title: 'Read the Next.js book',
    },
    {
      id: 'TSK-2',
      title: 'Write a website',
    },
  ]);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.summary}</li>
      ))}
    </ul>
  );
}
```

Just use a local variable instead:

```jsx
export default function GoodTaskList() {
  const tasks = [
    {
      id: 'TSK-1',
      title: 'Read the Next.js book',
    },
    {
      id: 'TSK-2',
      title: 'Write a website',
    },
  ];

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.summary}</li>
      ))}
    </ul>
  );
}
```

> Of course, in this particular example, the `tasks` variable should really be passed as a prop to the component.
> We just want to show you when to use and when not to use state here.

Second, you should never store data in state that you can derive from other state (or props).
For example, this is a bad idea:

```jsx
import * as React from 'react';

type Task = {
  id: string;
  title: string;
};

export default function TaskList() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [numTasks, setNumTasks] = React.useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    const taskId = event.currentTarget.taskId.value.trim();
    const title = event.currentTarget.title.value.trim();
    setTasks([
      ...tasks,
      {
        id: taskId,
        title,
      },
    ]);
    setNumTasks(numTasks + 1);
  }

  return (
    <>
      <ul>
        {tasks.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <p>You have {numTasks} tasks</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskId">Task ID:</label>
        <input type="text" id="taskId" />
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" />
        <br />
        <button type="submit">Add task</button>
      </form>
    </>
  );
}
```

In this example, you really do need the `tasks` state (since you need to remember the tasks that have been added so far).
However, you really don't need the `numTasks` state, because you can derive it from the value of the `tasks` state.

After all, `numTasks` is simply equal to `tasks.length`.

Here is how we can fix the component:

```jsx
import * as React from "react";

type Task = {
  id: string;
  title: string;
};

export default function TaskList() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  function handleSubmit(event) {
    event.preventDefault();
    const taskId = event.currentTarget.taskId.value.trim();
    const title = event.currentTarget.title.value.trim();
    setTasks([
      ...tasks,
      {
        id: taskId,
        title,
      },
    ]);
  }

  return (
    <>
      <ul>
        {tasks.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <p>You have {tasks.length} tasks</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskId">Task ID:</label>
        <input type="text" id="taskId" />
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" />
        <br />
        <button type="submit">Add task</button>
      </form>
    </>
  );
}
```
