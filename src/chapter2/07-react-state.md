## React State

### Forms

Let us now add the form for creating a new task. Before you continue reading, here is a mental exercise - _which component should contain this form_?

If you thought "obviously, it's the TaskList component", you are right! Let's enter src/task-list.js and import React at the top:

```javascript
import * as React from 'react';
```

Next we add the form inside the div (below all the p elements representing the tasks):

```html
<form onSubmit="{handleSubmit}">
  <label htmlFor="summary">Summary:</label>
  <input type="text" id="summary" />
  <br />
  <label htmlFor="description">Description:</label>
  <textarea id="description" />
  <br />
  <button type="submit">Add task</button>
</form>
```

This form contains the summary, the description and the "Add task" button. Try clicking the button - it won't do much. The reason for that is that we haven't yet told the button what to do on submit. Let's change that now.

We create a handleSubmit function, which simply logs something to the console. Note that the default behaviour of a form submission includes a browser refresh, which we don't want. To prevent the default behaviour, we have to call (surprise) the preventDefault function of the event:

```javascript
function handleSubmit(event) {
  event.preventDefault();
  console.log('Submit');
}
```

Next we make sure that the onSubmit function is called when the button is clicked. To accomplish that, we set the onSubmit property of the button to the `handleSubmit` function:

```html
<button type="submit" onSubmit="{handleSubmit}">Add task</button>
```

If you click the button, you should now see "Submit" logged to the console.

### Use React state to create new items

Now that we can add new tasks, our components needs to track **state** (the list of tasks in this case). React has the useState hook for this purpose. A **hook** is nothing more than a (special) function. This particular hook is a function that allows you to add state to a component:

```javascript
const [tasks, setTasks] = React.useState([]);
```

The `useState` hook declares a "state variable". The argument to the hook is the initial state. In this case, we begin with an empty list, since we have no tasks in the beginning. The hook returns a pair of values. The first element is the current state and the second element is a function for updating state. _You should never set the first element directly and only use the updating function. Otherwise React will get confused since it won't realize that your state has changed and will not update the DOM correctly._

The updater function takes the previous state and returns the next state. Here we take the list of previous tasks (i.e. the tasks that were present before the button click) and return the new tasks (i.e. the tasks that should be present after the button click). In this case we simply add the task to the end:

```javascript
function handleSubmit(event) {
  event.preventDefault();
  const [{ value: summary }, { value: description }] = event.target.elements;
  setTasks((previousTasks) => [
    ...previousTasks,
    {
      summary,
      description,
    },
  ]);
}
```

Try clicking the button - a new task should appear.
