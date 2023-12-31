## React State

<div style="text-align: right"> <i> Why was the useState hook feeling nostalgic? <br>
Because every time it was called, it brought back memories! <br> - From "1000 programming dad-jokes" </i> </div>

### Adding a Form

Let us now add the form for creating a new task.
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
Remember from chapter 3 that we need to call the `preventDefault` function to prevent the default behaviour of a form submission (which includes a page refresh):

```js
function handleSubmit(event) {
  event.preventDefault();
  const taskId = event.currentTarget.taskId.value.trim();
  const title = event.currentTarget.title.value.trim();
  console.log(`Submitted ${taskId}, ${title}`);
}
```

Next we need to make sure that the `handleSubmit` function is called when the button is clicked.
To accomplish that, we set the `onSubmit` property of the button to the `handleSubmit` function:

```jsx
<button type="submit" onSubmit={handleSubmit}>
  Add task
</button>
```

If you click the button, you should now see the title logged to the console.

### The `useState` Hook

Now that we want to add new tasks, our component needs to have some kind of "memory".
To accomplish this, we can use React **state**.
React has the `useState` hook for this purpose.

A **hook** is nothing more than a (special) function.
This particular hook is a function that allows you to add state ("memory") to a component:

```js
const [tasks, setTasks] = React.useState([]);
```

The `useState` hook declares a "state variable". The argument to the hook is the initial state.
In this case, we begin with an empty list, since we have no tasks in the beginning.

The `useState` hook returns a pair of values.
The first element is the current state and the second element is a function for updating state.

Note that you should never set the first element directly and only use the updating function.
Otherwise React will get confused since it won't realize that your state has changed and will not update the DOM correctly.

The updater function takes the previous state and returns the next state.
Here we take the list of previous tasks (i.e. the tasks that were present before the button click) and return the new tasks (i.e. the tasks that should be present after the button click).
In this case we simply add the task to the end:

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

Try clicking the button - a new task should appear.
