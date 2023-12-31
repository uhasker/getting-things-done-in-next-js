## React Effects

<div style="text-align: right"> <i> Why can't React effects keep a secret? <br> Because as soon as something changes, they just have to run and tell everyone! <br> - From "1000 programming dad-jokes" </i> </div>

### Why Effects?

Effects are useful, if you want to synchronize React with some _external system_ (like a server).

Consider a component which, upon rendering, needs to fetch a task title and display it to the user.
While your first instinct, might be to use an event handler together with state, this is not possible - after all there is no real user event here.
Instead we need to execute something because the component is rendering.

This is where effects come in handy.

### The `useEffect` Hook

Here is the simplest possible example for a `useEffect` hook.
This hook takes a function which is executed when the component is first rendered or updated:

```jsx
import { useEffect } from 'react';

function ExampleComponent() {
  useEffect(() => {
    console.log('Effect runs');
  });

  return <div>Hello, World!</div>;
}
```

Additionally we can return a cleanup function, which will run when the component is destroyed:

```jsx
function ExampleComponent() {
  useEffect(() => {
    console.log('Effect runs');

    return () => {
      console.log('Component destroyed');
    };
  });

  return <div>Hello, World!</div>;
}
```

### The Dependency Array

The `useHook` effect takes a second argument - a dependency array.
This allows you to specify that the effect should run only if a particular value changes:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count has changed to: ${count}`);
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

If the dependency array is empty, the effect will run only once - when the component is first rendered.

### Using `fetch` and `useEffect` Together

One of the most common usages of `useEffect` is to synchronize your component with an external API:

```jsx
import * as React from 'react';

function ExampleTask() {
  const [title, setTitle] = React.useState('');

  useEffect(() => {
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

Note that we don't have a cleanup function in our effect - normally we would abort the request here.
However this is out of scope for this introductory book.
