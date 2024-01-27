## React State

<div style="text-align: right"> <i> Why was the useState hook feeling nostalgic? <br>
Because every time it was called, it brought back memories! <br> - From "1000 programming dad-jokes" </i> </div>

### Why State?

In the previous section we learned how to render components.
However, these components are completely "static" right now.
But in reality, you often need to have "dynamic" components that change based on some action.

For example, clicking a button might need to update a counter and typing intp a form might need to update the input field.
This means that components need to be able to "remember" things (like the current counter or the input field value).

State serves as sort of memory for your component to achieve exactly that.

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

Try clicking the "Increment" button - it will increment the counter by 1 each time you click it.

This example is simple, but it clearly shows how to use state in React.

State is provided by the `useState` hook (a hook is basically just a function with some special properties).

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

Let's look at the following bad example:

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

The problem lies in the fact that, while we update the local variable, React doesn't actually rerender the component to show the change.
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
We begin to see the purpose of the `useState` hook - to define a state whose updates will trigger a rerender.

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

Therefore you can't use local variables and you can't update the state variables directly.
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

We will now see that the component rerender if we click the "Increment" button:

```
Rendered counter component with count=0
New value of count is 0
Rendered counter component with count=1
```

Note that the value of `count` only changes on the _next render_.
Here is what happens:

The component renders for the first time.
Because the initial value of `count` is set to `0`, it will render with `count` being equal to `0`.

You click the button and `setCount` is called with `count + 1` (which will be `0+1`, i.e. `1`).
React rerenders the component while remembering that the new `count` should be `1`.

The component renders for the second time.
Because React remembered that `count` was set to `1`, the component will render with `count` set to `1`.

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
