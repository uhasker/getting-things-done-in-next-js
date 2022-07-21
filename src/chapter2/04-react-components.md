## React components

### Create your first React component

Conceptually, a component is an independent and reusable piece of the UI. By thinking about an HTML page in terms of isolated components you can easily create well-designed pages.

Consider the first version of the easy-opus app. We will need to display a bunch of tasks. Every task should be its own component containing the task summary, description and a button to delete the task. These tasks are grouped in a task list component. In addition to the tasks, the task list component has a button to add a new task.

This is how it would look like in an image:

![](images/components.png)

In terms of implementation, a component is just a JavaScript function that takes the data it should render as input and returns the UI representation of the data as output. It will probably not come as a surprise to you at this point that the returned UI representation is given by JSX.

Let us move the task list into its own component:

```javascript
const TaskList = () => {
  return (
    <div id="taskList">
      <p>Read the MERN book: Read and understand the MERN book.</p>
      <p>Write a website: Create a new and cool website.</p>
    </div>
  );
};
```

Hooray! You created your first React component. Ok, now you can _definitely_ add React to your resume. No? Well, apparently you are really one of those weird people who actually learn things before putting them on their resume...

We could now call the TaskList component the same way we would call a regular JavaScript function. We could also wrap it in a `React.createElement` call. However thanks to the power of JSX we can just do this:

```javascript
const app = (
  <div>
    <h1>TODOs</h1>
    <TaskList />
  </div>
);
```

This looks just as if `<TaskList>` is a regular HTML tag! This means that we can use and nest our own components exactly like we would use and nest HTML elements. This leads to very simple code that is describing our UI in a very concise and straightforward manner.

This is why you should not confuse HTML and JSX. It's much more complicated (and relatively rare) to add you own custom tags in HTML. In comparison - creating custom components in JSX is easy and you will do so often. Isn't that great? Hint: _It totally is_.

### Add props to a React component

JSX is great, but the above code snippet is not. The main problem is that the data it represents is hardcoded into the component.

Let us fix that by passing properties (`props`) into the component. This is simply a JavaScript object containing the data the component should render. In our case we will simply pass an array of strings named `tasks` containing our task names. We can then use `map` to create a list of p elements from that array:

```javascript
const TaskList = (props) => {
  return (
    <div id="taskList">
      {props.tasks.map((task) => (
        <p id={task.id}>{`${task.summary}: ${task.description}`}</p>
      ))}
    </div>
  );
};
```

This is already not too bad, but of course we want to take advantage of the latest and greatest JavaScript syntax there is. Writing `props.items` or `item.summary` is annoying. This will become even more annoying when we have a lot of props. We can use object destructuring to alleviate this:

```javascript
const TaskList = ({ tasks }) => {
  return (
    <div id="taskList">
      {tasks.map(({ id, summary, description }) => (
        <p id={id}>{`${summary}: ${description}`}</p>
      ))}
    </div>
  );
};
```

> You can hopefully see how the concepts from chapter 1 all come together quite nicely.

Excellent! We can use the new component like this:

```javascript
const tasks = [
  {
    id: 'task1',
    summary: 'Read the MERN book',
    description: 'Read and understand the MERN book.',
  },
  {
    id: 'task2',
    summary: 'Write a website',
    description: 'Create a new and cool website.',
  },
];

const app = (
  <div id="app">
    <h1 id="headline">TODOs</h1>
    <TaskList tasks={tasks} />
  </div>
);
```

While we're at it, let's also make our `app` constant an actual component. This might seem redundant at the moment but soon you will see what advantages this approach has. Now that the `App` is a _function_ we can no longer pass it directly to `root.render(app)` but have to invoke it _or_ use JSX to do essentially the same.

```javascript
const App = () => {
  return (
    <div id='app'>
      <h1 id='headline'>Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  )
}

...

root.render(<App />);
```

Quite nice. Note that there is a problem with the current implementation of our component. You can see this by opening your browser console. An error "Warning: Each child in a list should have a unique "key" prop." will appear.

The reason for that is that React needs a way to identify which items in a list have changed or have been added or removed. It does that by looking at the keys of the items. These basically give the elements a stable identity.

Simply add a key to every `<p>` in the task list:

```javascript
const TaskList = ({ tasks }) => {
  return (
    <div id="taskList">
      {tasks.map(({ id, summary, description }) => (
        <p id={id} key={id}>{`${summary}: ${description}`}</p>
      ))}
    </div>
  );
};
```
