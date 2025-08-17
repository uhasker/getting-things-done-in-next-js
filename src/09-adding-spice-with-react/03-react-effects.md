## React Effects

<div style="text-align: right"> <i> Why can't React effects keep a secret? <br> Because as soon as something changes, they just have to run and tell everyone! <br> — From "1000 programming dad-jokes" </i> </div>

### Why Effects?

**Effects** are useful if you want to synchronize React with some _external system_ (like a server).

Consider a component which, upon rendering, needs to fetch a task title and display it to the user.
While your first instinct might be to use an event handler together with state, this is not possible.
After all, there is no real user event here.
Instead, we need to execute something _because the component is rendering_.

This is where effects come in handy.

### The `useEffect` Hook

Here is the simplest possible example for a `useEffect` hook.
This hook takes a function which is executed when the component is first rendered or rerendered:

```jsx
import * as React from 'react';

export default function ExampleComponent() {
  React.useEffect(() => {
    console.log('Effect runs');
  });

  return <div>Hello, World!</div>;
}
```

If you display this component on a page, here is what you will see in the console:

```
Effect runs
```

Let's add some state to the component so that we can see what happens when the component rerenders:

```jsx
import * as React from 'react';

export default function ExampleCounter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log(`Effect runs (currently count=${count})`);
  });

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

Open the page containing the component again and you will see the following log:

```
Effect runs (currently count=0)
```

Now click the button a few times—you will see that on each rerender the effect is executed:

```
Effect runs (currently count=1)
Effect runs (currently count=2)
Effect runs (currently count=3)
Effect runs (currently count=4)
```

Additionally, we can return a cleanup function, which will run when the component is destroyed (_unmounted_), and before every _rerun_ of the useEffect.
We will examine when exactly an effect reruns in the next section.

Consider this example:

```jsx
import * as React from 'react';

export default function ExampleComponent() {
  React.useEffect(() => {
    console.log('Effect runs');

    return () => {
      console.log('Component destroyed');
    };
  });

  return <div>Hello, World!</div>;
}
```

If the component is destroyed (for example, because you refresh the page or navigate away from the current page), you will see the following log:

```
Component destroyed
```

Usually, you would use the cleanup function to do some cleanup (_no way_).
For example, if you've connected to an external system, here is where you would disconnect.

### The Dependency Array

The `useEffect` hook also takes a second argument—a **dependency array**.
This allows you to specify that the effect should run only if a particular value changes.

Consider this (slightly constructed) example:

```jsx
import * as React from 'react';

export default function Counter() {
  const [firstCount, setFirstCount] = React.useState(0);
  const [secondCount, setSecondCount] = React.useState(0);

  React.useEffect(() => {
    console.log(`Current counts: firstCount=${firstCount}, secondCount=${secondCount}`);
  }, [firstCount]);

  return (
    <div>
      <p>{`Current counts: firstCount=${firstCount}, secondCount=${secondCount}`}</p>
      <button onClick={() => setFirstCount(firstCount + 1)}>Increment first count</button>
      <button onClick={() => setSecondCount(secondCount + 1)}>Increment second count</button>
    </div>
  );
}
```

As usual, the effect runs on the initial render:

```
Current counts: firstCount=0, secondCount=0
```

If you click the "Increment first count" button, you will see that the effect runs again:

```
Current counts: firstCount=1, secondCount=0
Current counts: firstCount=2, secondCount=0
Current counts: firstCount=3, secondCount=0
Current counts: firstCount=4, secondCount=0
```

However, if you click the "Increment second count" button, you will see that the effect doesn't run (and nothing is logged to the console).

This is because `firstCount` is in the dependency array, but `secondCount` isn't.
Therefore, an update to `firstCount` (via the `setFirstCount` setter function) will trigger the effect.
However, an update to `secondCount` (via the `setSecondCount` setter function) will not trigger the effect.

If you want to trigger the effect when `secondCount` is updated, you will need to add `secondCount` to the dependency array:

```js
React.useEffect(() => {
  console.log(`Current counts: firstCount=${firstCount}, secondCount=${secondCount}`);
}, [firstCount, secondCount]);
```

Note that if the dependency array is empty, the effect will run only once—when the component is first rendered.
This directly follows from the explanation above—an empty dependency array contains no values that would trigger the effect again.

Consider this example:

```jsx
import * as React from 'react';

export default function Counter() {
  const [firstCount, setFirstCount] = React.useState(0);
  const [secondCount, setSecondCount] = React.useState(0);

  React.useEffect(() => {
    console.log(`Current counts: firstCount=${firstCount}, secondCount=${secondCount}`);
  }, []);

  return (
    <div>
      <p>{`Current counts: firstCount=${firstCount}, secondCount=${secondCount}`}</p>
      <button onClick={() => setFirstCount(firstCount + 1)}>Increment first count</button>
      <button onClick={() => setSecondCount(secondCount + 1)}>Increment second count</button>
    </div>
  );
}
```

The effect will run on the initial render:

```
Current counts: firstCount=0, secondCount=0
```

But it won't run again, no matter how often you click the buttons.

Here is a bonus tip regarding effects: **You should always explicitly specify the dependency array**.

Remember, if you don't specify the dependency array, the effect will rerun on every render, which is rarely the desired behaviour.
In fact this can result in catastrophic behaviour, like in the following example:

```jsx
export default function ExampleComponent() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setCount(count + 1);
  });

  return (
    <div>
      <h1>Example Component</h1>
      <p>Count: {count}</p>
    </div>
  );
}
```

If you run this, you will see that the counter just keeps incrementing in an infinite loop.
This is because the effect calls `setCount`, which will trigger a rerender, which will trigger the effect again, which will call `setCount` etc.

React is actually smart enough to realize the problem and will log the following warning to the console:

```
Maximum update depth exceeded.
This can happen when a component calls setState inside useEffect,
but useEffect either doesn't have a dependency array,
or one of the dependencies changes on every render.
```

### Using `fetch` and `useEffect` Together

One of the most common usages of `useEffect` is to synchronize your component with an external API.

Let's return to our motivation for this section, where we wanted to fetch a task title and display it to the user.
Since the task title is held by the API (i.e. an external system), this seems like a perfect use case for an effect:

```jsx
import * as React from 'react';

export default function ExampleTask() {
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status was ${response.status}`);
        }
        return response.json();
      })
      .then((json) => setTitle(json.title))
      .catch((error) => console.log(error));
  }, []);

  return <p>{title}</p>;
}
```

This code should be pretty clear if you understand the `fetch` function and the `useEffect` hook.

Our effect fetches a the task from the API and then sets a state called `title` after the fetch is completed.
Because we only want this to happen on the initial component render, we specify an empty dependency array.

Note that we don't have a cleanup function in our effect—normally we would abort the request here.
However this is out of scope for this introductory book.

### You Rarely Need an Effect

Just like with state, beginners tend to heavily _overuse_ effects.

Remember: **Effects are only needed if you need to synchronize with an external system**.
You should not need an effect in any other scenario.

Effects are definitely not needed if you need update some state based on props and other state.
Something like this is completely unnecessary:

```jsx
import * as React from 'react';

type Task = {
  id: string;
  title: string;
};

export default function TaskList() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [numTasks, setNumTasks] = React.useState(0);

  // This is a really bad idea
  React.useEffect(() => {
    setNumTasks(tasks.length + 1);
  }, [tasks])

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

Instead, you should simply calculate the depending value during rendering (like we've discussed in the previous section).

Similarly, you don't need effects when you want to reset or adjust some state based on a prop change.

> In fact, these days some guidelines recommend to not use an effect even for fetching data.
> This is because if you fetch data inside an effect in more complex scenarios, you need to think about cleanup functions, race conditions etc.
> This why most frameworks that build on top of React (like Next.js) usually provide better data fetching mechanisms than fetching data in effects.
