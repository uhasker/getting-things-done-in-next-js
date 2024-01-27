## React Effects

<div style="text-align: right"> <i> Why can't React effects keep a secret? <br> Because as soon as something changes, they just have to run and tell everyone! <br> - From "1000 programming dad-jokes" </i> </div>

### Why Effects?

**Effects** are useful, if you want to synchronize React with some _external system_ (like a server).

Consider a component which, upon rendering, needs to fetch a task title and display it to the user.
While your first instinct might be to use an event handler together with state, this is not possible - after all there is no real user event here.
Instead we need to execute something _because the component is rendering_.

This is where effects come in handy.

### The `useEffect` Hook

Here is the simplest possible example for a `useEffect` hook.
This hook takes a function which is executed when the component is first rendered or re-rendered:

```jsx
import * as React from 'react';

export default function ExampleComponent() {
  React.useEffect(() => {
    console.log('Effect runs');
  });

  return <div>Hello, World!</div>;
}
```

If you open this component, here is what you will see in the console:

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

Open this component again and you will see the following log:

```
Effect runs (currently count=0)
```

Now click the button a few times - you will that on each rerender the effects is executed:

```
Effect runs (currently count=1)
Effect runs (currently count=2)
Effect runs (currently count=3)
Effect runs (currently count=4)
```

Additionally we can return a cleanup function, which will run when the component is destroyed.
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

Usually you would use the cleanup function to do some cleanup (_no way_).
For example, if you've connected to an external system, here is were you would disconnect.

### The Dependency Array

The `useHook` effect also takes a second argument - a **dependency array**.
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

If you click the "Increment first count" button, you will see that the effect runs:

```
Current counts: firstCount=1, secondCount=0
Current counts: firstCount=2, secondCount=0
Current counts: firstCount=3, secondCount=0
Current counts: firstCount=4, secondCount=0
```

However, if you click the "Increment second count" button, you will see that the effect doesn't run (and nothing is logged to the console).

This is because, `firstCount` is in the dependency array, but `secondCount` isn't.
Therefore, an update to `firstCount` (via the `setFirstCount` setter function) will trigger the effect.
But an update to `secondCount` (via the `setSecondCount` setter function) won't.

If you want to trigger the effect when `secondCount` is updated, you will need to add `secondCount` to the dependency array:

```js
React.useEffect(() => {
  console.log(`Current counts: firstCount=${firstCount}, secondCount=${secondCount}`);
}, [firstCount, secondCount]);
```

Note that if the dependency array is empty, the effect will run only once - when the component is first rendered.
This directly follows from the explanation above - an empty dependency array contains no values that would trigger the effect again.

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

But it will never run again, no matter how often you click the buttons.

Here is a bonus tip from us: **You should always explicitly specify the dependency array**.

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
This is because, the effect calls `useState`, which will trigger a rerender, which will trigger the effect again, which will call `useState` etc.

React is actually smart enough to realize the problem and will log the following warning to the console:

```
Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
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

Note that we don't have a cleanup function in our effect - normally we would abort the request here.
However this is out of scope for this introductory book.
